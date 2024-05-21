const token = localStorage.getItem('token');

if (token) {
  // 토큰이 존재하면 로그인 상태로 간주하고 메인 페이지를 변경
  // 여기에서는 토큰을 서버에 전달하는 방식을 사용하는 것을 가정
  // (예: 헤더에 'Authorization' 키로 토큰을 담아서 요청)
  fetch('/checkLogin', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.loggedIn) {
      // 서버로 로그인 상태를 전달 (예: '/updateLoginStatus' 엔드포인트 사용)
      fetch('/updateLoginStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loggedIn: true }),
      })
      .then(response => response.json())
      .then(updatedData => {
        // 서버에서 받은 응답에 따라 메인 페이지를 변경
        if (updatedData.success) {
          // 메인 페이지로 이동
          window.location.href = '/';
        } else {
          console.error('Failed to update login status on the server');
        }
      })
      .catch(error => console.error(error));
    }
  })
  .catch(error => console.error(error));
}