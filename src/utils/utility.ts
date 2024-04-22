export const isValidEmail = (email: string) => {
  return email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3,4}$/)
}

export const isValidPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.match(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)
}

export const maskString = (str: string, num: number, start: string) => {
  let maskedString

  if (![str, num, start].every(Boolean)) return ''

  if (str.length < num) return ''
  switch (start) {
    case 'left':
      maskedString = '*'.repeat(num) + str.slice(num)
      break
    case 'right':
      maskedString = str.slice(0, -num) + '*'.repeat(num)
      break
    default:
      maskedString = ''
  }
  return maskedString
}
/*export const saveLoginInfo = (loginInfo: UserInfo) => {
  window.localStorage.setItem(
    process.env.REACT_APP_LOGIN_INFO ?? "",
    JSON.stringify(loginInfo) ?? ""
  );
};

export const clearLoginData = () => {
  window.localStorage.removeItem(process.env.REACT_APP_LOGIN_INFO ?? "");
};

export const getLoginInfoUserName = (): string => {
  const loginInfo: UserInfo = JSON.parse(
    window.localStorage.getItem(process.env.REACT_APP_LOGIN_INFO ?? "") ?? ""
  );
  return loginInfo.name ?? "";
};

export const getLoginInfoJwt = () => {
  const loginInfo = JSON.parse(
    window.localStorage.getItem(process.env.REACT_APP_LOGIN_INFO ?? "") ?? ""
  );
  return loginInfo.jwt ?? "";
};*/
