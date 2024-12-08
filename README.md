## 사용 라이브러리

- @react-native-async-storage/async-storage <<< NEW!!!
- expo-blur <<< NEW!!!
- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/stack
- @react-navigation/bottom-tabs
- react-native-screens
- expo-image-picker
- expo-document-picker

## 폴더 구조

<pre>
<code>
mini-project/
├── assets/             # 이미지, 폰트, 아이콘 등 정적 파일
├── components/         # 재사용 가능한 컴포넌트
│   ├── Button.js
│   ├── Card.js
│   └── ...
├── navigation/         # 네비게이션 관련 설정
│   ├── MainNavigator.js
│   └── ...
├── screens/            # 각 화면별 컴포넌트
│   ├── HomeScreen.js
│   ├── ChatScreen.js
│   ├── ProfileScreen.js
│   └── ...
├── hooks/              # 커스텀 훅
│   ├── useAuth.js
│   └── ...
├── services/           # API 호출 및 비즈니스 로직
│   ├── api.js
│   └── ...
├── utils/              # 유틸리티 함수 및 헬퍼 함수
│   ├── formatDate.js
│   └── ...
├── App.js              # 메인 앱 파일
└── app.json            # Expo 설정 파일
</code>
</pre>
