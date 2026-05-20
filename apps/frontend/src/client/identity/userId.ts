const USER_ID_KEY = "USER_ID";

export const getOrCreateUserId = (): string => {
  const exists = localStorage.getItem("USER_ID");

  if (exists) {
    return exists;
  } else {
    const newUserId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, newUserId);
    return newUserId;
  }
};
