import React from "react";

const apiRequest = async (url = "", Operation = null, errMsg = null) => {
  try {
    const response = await fetch(url, Operation);
    if (!response.ok) {
      throw new Error("Please Reload an Error");
    }
  } catch (err) {
    errMsg = err.Message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
