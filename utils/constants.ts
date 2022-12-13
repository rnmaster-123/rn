type RegexType = {
  email: RegExp;
  password: RegExp;
  phone: RegExp;
  passwordCheck?: RegExp; // TS에러 방지
};

const REGEX: RegexType = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^[a-zA-Z0-9]{8,16}$/,
  phone: /^\d{3}-\d{3,4}-\d{4}$/,
} as const;

const FORM_ERR_MSG: { [index: string]: string } = {
  email: '올바른 이메일 패턴이 아닙니다.',
  password: '8~16자 영문 대소문자, 숫자를 사용하세요.',
  required: '해당란을 입력해주세요.',
  passwordCheck: '비밀번호가 일치하지 않습니다.',
  phone: '올바른 휴대폰 패턴이 아닙니다.',
} as const;

type accessHintType = {
  LOADER: 'loader';
  PW: 'password';
  PW_CHECK: 'password_check';
};

const ACCESS_HINT: accessHintType = {
  LOADER: 'loader',
  PW: 'password',
  PW_CHECK: 'password_check',
} as const;

export { REGEX, FORM_ERR_MSG, ACCESS_HINT };
