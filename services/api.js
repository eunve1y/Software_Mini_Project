import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://172.20.9.165:3000";
const userId = 0;

// 로그인 함수
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await response.json();

    if (response.ok) {
      // 로그인 성공 시 token을 AsyncStorage에 저장
      await AsyncStorage.setItem("userToken", data.token);

      // 추가로 사용자 정보도 저장할 수 있어
      //await AsyncStorage.setItem("userId", JSON.stringify(userId));
      await AsyncStorage.setItem("userId", JSON.stringify(data.user.id));
      console.log(data.user.id);

      return true;
    } else {
      // 로그인 실패 처리
      console.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

///////////////////////////

// Axios 인스턴스를 생성하여 기본 설정을 할 수 있습니다.
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시 토큰을 자동으로 헤더에 추가하는 설정
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 회원가입 함수
export const register = async (email, password, nickname) => {
  try {
    const response = await api.post("/api/register", {
      email,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

// 로그아웃 함수: 토큰 및 사용자 ID 제거
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
    return true;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};

// 유저 프로필 정보를 불러오는 함수
export const fetchUserProfile = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) throw new Error("로그인 정보가 없습니다.");
    const response = await api.get(`/api/userInfo?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("유저 프로필 불러오기 실패:", error);
    throw error;
  }
};

// 게시물 작성 함수
export const createPost = async (
  title,
  content,
  parentCategoryId,
  subCategoryId,
  imageUrl
) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    console.log("불러온 userId:", userId); // 불러온 userId를 로그로 출력
    if (!userId) throw new Error("로그인 정보가 없습니다.");

    // 서버가 요구하는 형식에 맞게 데이터 구성
    const postData = {
      poster: userId, // userId를 poster로 설정
      title,
      content,
      parentCategoryId, // 서버에서 요구하는 parentCategoryId
      subCategoryId, // 서버에서 요구하는 subCategoryId
    };

    if (imageUrl) {
      postData.imageUrl = imageUrl; // 이미지 URL 추가
    }

    // API 요청 URL 확인을 위한 디버깅 로그
    console.log("보내는 데이터:", postData);
    console.log("요청 URL:", `${API_BASE_URL}/api/post/newpost`);

    const response = await api.post("/api/post/newpost", postData); // 게시물 등록 요청

    // 서버 응답 확인을 위한 디버깅 로그
    console.log("서버에서 반환된 데이터:", response.data);

    return response.data;
  } catch (error) {
    console.error("게시물 작성 실패:", error);
    throw error;
  }
};

// 꿀팁 거래 게시판 관련 API 함수

// 모든 게시물 불러오기 함수 (꿀팁 거래 게시판)
export const fetchHoneyTipPosts = async () => {
  try {
    const response = await api.get("/api/tips");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch HoneyTip posts:", error);
    throw error;
  }
};

// 카테고리별 게시물 불러오기 함수 (꿀팁 거래 게시판)
export const fetchHoneyTipPostsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/api/tips/${categoryId}`);
    console.log("Response data for category:", categoryId, response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts by category:", error);
    throw error;
  }
};

// 게시물 작성 함수 (꿀팁 거래 게시판)
export const createHoneyTipPost = async (title, content, category) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) throw new Error("로그인 정보가 없습니다.");

    const postData = {
      poster: userId,
      title,
      content,
      sub_category_name: category,
    };

    const response = await api.post("/api/post/newpost", postData);
    console.log("HoneyTip Post created:", response.data);

    return response.data;
  } catch (error) {
    console.error("HoneyTip Post creation failed:", error);
    throw error;
  }
};

// 특정 카테고리의 게시물들을 가져오는 함수
export const fetchPostsByCategory = async (category) => {
  let url = "/api/info";

  if (category === "교내") {
    url += "/campus";
  } else if (category === "서포터즈/동아리") {
    url += "/external";
  } else if (category === "자격증") {
    url += "/certifications";
  } else if (category === "공모전") {
    url += "/contests";
  }

  try {
    const response = await api.get(url); // api 인스턴스 사용
    const posts = response.data;

    // 각 게시물에 이미지 URL과 카테고리 정보를 추가
    const updatedPosts = posts.map((post) => ({
      ...post,
      imageUrl: post.coverImage ? `${API_BASE_URL}/${post.coverImage}` : null, // 이미지 URL
      category: category, // 카테고리 추가
    }));

    return updatedPosts; // 카테고리와 이미지 URL이 포함된 게시물 데이터 반환
  } catch (error) {
    console.error("게시물 불러오기 실패:", error);
    throw error;
  }
};

// 커뮤니티 게시물 불러오는 API 함수
export const fetchCommunityPosts = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const response = await axios.get(`${API_BASE_URL}/api/communities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // 서버로부터 받아온 커뮤니티 게시물 데이터 반환
  } catch (error) {
    console.error("커뮤니티 게시물 불러오기 실패:", error);
    throw error;
  }
};

// 게시물 작성시, 이미지 파일 업로드 함수
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", {
    uri: imageFile.uri,
    name: imageFile.name,
    type: imageFile.type,
  });

  try {
    const response = await api.post("/api/post/newpost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw error;
  }
};

// 게시물 삭제 함수
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/api/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("게시물 삭제 실패:", error);
    throw error;
  }
};

// 게시물 수정 함수
export const updatePost = async (postId, title, content) => {
  try {
    const response = await api.put(`/api/posts/${postId}`, {
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("게시물 수정 실패:", error);
    throw error;
  }
};

// 게시물 리스트를 불러오는 함수 (모든 게시물)
export const fetchPosts = async () => {
  try {
    const response = await api.get("/api/posts");
    return response.data;
  } catch (error) {
    console.error("게시물 리스트 불러오기 실패:", error);
    throw error;
  }
};

//////////////////////

// 마일리지 내역
export async function fetchMileageData() {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const response = await fetch(
      `${API_BASE_URL}/api/userInfo/transactions?userId=${userId}`
    );
    if (!response.ok) {
      // 응답이 실패한 경우
      const errorData = await response.json();
      throw new Error(
        errorData.message || "거래 내역을 불러오는 중 에러가 발생했습니다."
      );
    }

    const transactions = await response.json(); // 응답 데이터 파싱
    console.log("거래 내역:", transactions); // 거래 내역 출력
    return transactions;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// 인기글 받아오는 함수
export async function fetchHotPosts() {
  const response = await fetch(`${API_BASE_URL}/api/posts/popular`);
  if (!response.ok) {
    throw new Eror("error!");
  }
  const body = await response.json();
  return body;
}

// 검색 API 요청 함수
export async function fetchSearchResults(
  keyword,
  parentCategoryId,
  subCategoryId
) {
  if (keyword.trim() === "") {
    Alert.alert("검색어를 입력해 주세요.");
    return;
  }
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/search?keyword=${keyword}&parentCategoryId=${parentCategoryId}&subCategoryId=${subCategoryId}`
    );

    /*if (response.status === 404) {
      return [];
    }*/
    const data = await response.json();
    console.log("데이터를 가져오는 중");
    console.log(data);
    return data.results;
  } catch (error) {
    console.error("검색 결과를 가져오는 중 오류가 발생했습니다:", error);
  }
}

// 검색어 저장 함수
// 검색어는 같고 카테고리는 다른 경우에도 저장하게 할 건지??
export async function saveSearchKeyword(searchKeyword) {
  const userId = await AsyncStorage.getItem("userId");
  console.log(userId);
  const response = await fetch(`${API_BASE_URL}/api/search/keyword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, keyword: searchKeyword }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error:", data.error);
    return false;
  }

  return true;
}

// 게시글 정보 받아오는 함수 => API 명세서에는 post_id와 author_id를 request body로 보내게 되어있음. 나중에 수정
// 문제!!! 게시글 구매 안 한 경우 구매 후 이용 가능하다는 메세지만 도착함. 메세지랑 함께 게시글 정보를 같이 줘야 함.
// 게시글 구매 여부를 같이 보내줬으면 좋겠음
export async function fetchPostDetail(postId) {
  const userId = await AsyncStorage.getItem("userId");
  try {
    console.log("api호출");
    const response = await fetch(
      `${API_BASE_URL}/api/post/getpost/${postId}?userId=${userId}`
    );
    if (!response.ok) {
      throw new Eror("error!");
    }
    const body = await response.json();
    console.log(body);
    return body;
  } catch (error) {
    console.error("오류 발생", error);
  }
}

// 유저 정보 받아오는 함수
export async function fetchUserData(userId) {
  // 추후 수정
}

// 바로 결제 함수
export async function buyDirect(postId) {
  const userId = await AsyncStorage.getItem("userId");
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/payment/direct?userId=${userId}&postId=${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // 상태 코드가 200이 아닐 경우 처리
    if (!response.ok) {
      const errorText = await response.text(); // 에러 응답 확인
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "success") {
      console.log("결제 성공");
      return result.remainingMileage;
    } else {
      // 기존의 실패 처리 로직
      if (result.status === "fail") {
        if (result.message === "이미 존재하는 거래 기록입니다.") {
          return { success: false, reason: "alreadyBuy" };
        } else if (result.message === "잔액이 부족합니다.") {
          return { success: false, reason: "noMileage" };
        } else {
          return { success: false, reason: "otherError" };
        }
      }
    }
  } catch (error) {
    console.error("Error during payment:", error);
  }
}

// 장바구니에 담기 함수 => 장바구니에 성공적으로 담으면 true를 리턴. 이를 이용해 state에 반영하기
export async function handleCartClick(postId) {
  const userId = await AsyncStorage.getItem("userId");
  const response = await fetch(
    `${API_BASE_URL}/api/cart/items?userId=${userId}&postId=${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    // 장바구니에 이미 담겨져 있는 경우를 따로 처리
    if (
      response.status === 400 &&
      data.message === "장바구니에 이미 담겨져 있습니다."
    ) {
      return { success: false, reason: "alreadyInCart" }; // 특정 오류를 구분할 수 있게 리턴
    }
    return { success: false, reason: "otherError" }; // 다른 오류
  } else {
    return { success: true }; // 성공 시
  }
}

// 장바구니 목록 받아오는 함수
export async function fetchCartLists() {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const response = await fetch(
      `${API_BASE_URL}/api/cart/items?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({ userId: 2 }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      return data; // 장바구니 항목 반환
    } else {
      throw new Error(
        data.message || "장바구니 항목을 가져오는 데 실패했습니다."
      );
    }
  } catch (error) {
    console.error("오류 발생:", error);
    return []; // 오류 발생 시 빈 배열 반환
  }
}

// 장바구니 전체 삭제
export async function clearCart() {
  const userId = await AsyncStorage.getItem("userId");
  const response = await fetch(
    `${API_BASE_URL}/api/cart/items/clear?userId=${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return false;
  }

  return true;
}

// 장바구니 선택 삭제
export async function deleteActiveCartItems() {
  const userId = await AsyncStorage.getItem("userId");
  const response = await fetch(
    `${API_BASE_URL}/api/cart/items?userId=${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return false;
  }

  return true;
}

// 장바구니 아이템 토글
export async function handleCartToggle(itemId) {
  const userId = await AsyncStorage.getItem("userId");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/cart/items/toggle?userId=${userId}&itemId=${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "서버 요청 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling cart item active state:", error);
  }
}

// 좋아요 보내기 함수
export async function handleLikeClick(postId) {
  const userId = await AsyncStorage.getItem("userId");

  try {
    // fetch를 이용해 POST 요청 보내기
    const response = await fetch(
      `${API_BASE_URL}/api/react/${postId}/like?userId=${userId}`,
      {
        method: "POST", // POST 요청
        headers: {
          "Content-Type": "application/json", // 요청의 내용 형식을 JSON으로 지정
        },
      }
    );

    const data = await response.json();

    // 응답 상태 처리
    if (!response.ok) {
      // 이미 좋아요를 누른 경우를 따로 처리
      if (
        response.status === 400 &&
        data.error === "이미 좋아요를 눌렀습니다."
      ) {
        return { success: false, reason: "alreadyLiked" }; // 이미 좋아요를 눌렀다는 구분
      }
      return { success: false, reason: "otherError" }; // 다른 오류
    } else {
      return { success: true }; // 성공 시
    }
  } catch (error) {
    console.error("좋아요 전송 중 에러 발생: ", error);
  }
}

// 좋아요 취소 함수
export async function handleRemoveLikeClick(postId) {
  const userId = await AsyncStorage.getItem("userId");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/react/${postId}/like?userId=${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      //throw new Error("Failed to remove like");
      console.log("좋아요 취소 실패");
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error removing like:", error);
    throw error; // 실패 시 에러를 반환
  }
}

// 싫어요 보내기 함수
export async function handleDislikeClick(postId) {
  try {
    // AsyncStorage에서 userId를 가져와서 사용할 수 있지만, 여기서는 백엔드에서 처리하므로 생략 가능
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      throw new Error("User ID가 없습니다. 로그인하세요.");
    }

    // API 호출
    const response = await fetch(
      `${API_BASE_URL}/api/react/${postId}/dislike?userId=${userId}`,
      {
        method: "POST", // POST 또는 PUT 요청
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({ userId }), // 만약 필요한 경우 userId를 전달할 수 있습니다.
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // 이미 싫어요를 누른 경우를 따로 처리
      if (
        response.status === 400 &&
        data.error === "이미 싫어요를 눌렀습니다."
      ) {
        return { success: false, reason: "alreadyDisliked" }; // 이미 싫어요를 누른 경우
      }
      return { success: false, reason: "otherError" }; // 다른 오류
    } else {
      return { success: true, message: data.message }; // 성공 시
    }
  } catch (error) {
    console.error("싫어요 요청 중 에러 발생:", error);
    return false; // 에러 발생 시 null 반환
  }
}

// 싫어요 삭제
export async function handleRemoveDislikeClick(postId) {
  const userId = await AsyncStorage.getItem("userId");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/react/${postId}/dislike?userId=${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      //throw new Error("Failed to remove like");
      console.log("싫어요 취소 실패");
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error removing dislike:", error);
    throw error; // 실패 시 에러를 반환
  }
}

// 결제 요청
export async function requestPayment() {
  try {
    // AsyncStorage에서 userId를 가져옴
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      throw new Error("User ID가 없습니다. 로그인하세요.");
    }

    // API 호출
    const response = await fetch(
      `${API_BASE_URL}/api/payment?userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      // 결제 요청 성공 시 처리
      console.log("결제 요청 성공:", data);
      return data; // 성공 시 응답 데이터 반환
    } else {
      // 결제 요청 실패 시 처리
      console.error("결제 요청 실패:", data.message);
      return null; // 실패 시 null 반환
    }
  } catch (error) {
    console.error("결제 요청 중 에러 발생:", error);
    return null; // 에러 발생 시 null 반환
  }
}

/*
// 게시글 구매 여부 받아오는 함수
export async function 어쩌구저쩌구(userId, postId) {
    const response = await fetch(...);
    if (response.ok){
      return true;
    } else {
     return false;
    }
}

// 좋아요 여부 받아오는 함수
export async function 어쩌구저쩌구(userId, postId) {
    const response = await fetch(...);
    if (response.ok){
      return true;
    } else {
     return false;
    }
}

// 장바구니에 담았는지 확인하는 함수
export async function 어쩌구저쩌구(userId, postId) {
    const response = await fetch(...);
    if (response.ok){
      return true;
    } else {
     return false;
    }
}
*/
