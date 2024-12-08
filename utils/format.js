export function formatDate(dateString) {
  const date = new Date(dateString);

  // 월과 일을 가져옵니다.
  const options = { month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("ko-KR", options);

  return formattedDate; // "10월 11일" 형식으로 반환
}

// 영어 형식으로 반환되는 하위 카테고리 한글로 변경해주는 함수
export function formatSubCategory(name) {
  switch (name) {
    case "CAMPUS":
      return "교내";
      break;
    case "SUPPORTERS":
      return "서포터즈/동아리";
      break;
    case "CERTIFICATION":
      return "자격증";
      break;
    case "CONTEST":
      return "공모전";
      break;
    case "JOB":
      return "채용";
      break;
  }
}
