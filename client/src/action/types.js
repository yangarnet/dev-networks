export const CLEAR_ERRORS = "CLEAR_ERRORS";
// USER AUTH
export const AUTH_ACTION = {
    USER_REGISTER_PENDING: "USER_REGISTER_PENDING",
    USER_REGISTER_RESOLVE: "USER_REGISTER_RESOLVE",
    USER_REGISTER_REJECT: "USER_REGISTER_REJECT",

    USER_LOGIN_PENDING: "USER_LOGIN_PENDING",
    USER_LOGIN_RESOLVE: "USER_LOGIN_RESOLVE",
    USER_LOGIN_REJECT: "USER_LOGIN_REJECT",

    USER_LOGOUT: "USER_LOGOUT",
    SET_CURRENT_USER: "SET_CURRENT_USER"
};
// USER PROFILE
export const PROFILE_ACTION = {
    GET_PROFILE_PENDING: "GET_PROFILE_PENDING",
    GET_PROFILE_RESOLVE: "GET_PROFILE_RESOLVE",
    GET_PROFILE_REJECT: "GET_PROFILE_REJECT",

    GET_PROFILE_BY_HANDLE_PENDING: "GET_PROFILE_BY_HANDLE_PENDING",
    GET_PROFILE_BY_HANDLE_RESOLVE: "GET_PROFILE_BY_HANDLE_RESOLVE",
    GET_PROFILE_BY_HANDLE_REJECT: "GET_PROFILE_BY_HANDLE_REJECT",

    GET_ALL_PROFILE_PENDING: "GET_ALL_PROFILE_PENDING",
    GET_ALL_PROFILE_RESOLVE: "GET_ALL_PROFILE_RESOLVE",
    GET_ALL_PROFILE_REJECT: "GET_ALL_PROFILE_REJECT",

    CLEAR_CURRENT_USER_PROFILE: "CLEAR_CURRENT_USER_PROFILE",

    CREATE_PROFILE_PENDING: "CREATE_PROFILE_PENDING",
    CREATE_PROFILE_RESOLVE: "CREATE_PROFILE_RESOLVE",
    CREATE_PROFILE_REJECT: "CREATE_PROFILE_REJECT",

    EDIT_PROFILE_PENDING: "EDIT_PROFILE_PENDING",
    EDIT_PROFILE_RESOLVE: "EDIT_PROFILE_RESOLVE",
    EDIT_PROFILE_REJECT: "EDIT_PROFILE_REJECT",

    REFETCH_USER_PROFILE: "REFETCH_USER_PROFILE",

    ADD_USER_EXPERIENCE_PENDING: "ADD_USER_EXPERIENCE_PENDING",
    ADD_USER_EXPERIENCE_RESOLVE: "ADD_USER_EXPERIENCE_RESOLVE",
    ADD_USER_EXPERIENCE_REJECT: "ADD_USER_EXPERIENCE_REJECT",

    ADD_USER_EDUCATION_PENDING: "ADD_USER_EDUCATION_PENDING",
    ADD_USER_EDUCATION_RESOLVE: "ADD_USER_EDUCATION_RESOLVE",
    ADD_USER_EDUCATION_REJECT: "ADD_USER_EDUCATION_REJECT",

    DELETE_USER_EDUCATION_PENDING: "DELETE_USER_EDUCATION_PENDING",
    DELETE_USER_EDUCATION_RESOLVE: "DELETE_USER_EDUCATION_RESOLVE",
    DELETE_USER_EDUCATION_REJECT: "DELETE_USER_EDUCATION_REJECT",

    DELETE_USER_EXPERIENCE_PENDING: "DELETE_USER_EXPERIENCE_PENDING",
    DELETE_USER_EXPERIENCE_RESOLVE: "DELETE_USER_EXPERIENCE_RESOLVE",
    DELETE_USER_EXPERIENCE_REJECT: "DELETE_USER_EXPERIENCE_REJECT",

    RELOAD_ALL_USER_PROFILES: "RELOAD_ALL_USER_PROFILES"
};

export const POST_ACTION = {
    ADD_POST_PENDING: "ADD_POST_PENDING",
    ADD_POST_RESOLVE: "ADD_POST_RESOLVE",
    ADD_POST_REJECT: "ADD_POST_REJECT",

    EDIT_POST_BY_ID_PENDING: "EDIT_POST_BY_ID_PENDING",
    EDIT_POST_BY_ID_RESOLVE: "EDIT_POST_BY_ID_RESOLVE",
    EDIT_POST_BY_ID_REJECT: "EDIT_POST_BY_ID_REJECT",

    GET_ALL_POSTS_PENDING: "GET_ALL_POSTS_PENDING",
    GET_ALL_POSTS_RESOLVE: "GET_ALL_POSTS_RESOLVE",
    GET_ALL_POSTS_REJECT: "GET_ALL_POSTS_REJECT",

    GET_POST_BY_ID_PENDING: "GET_POST_BY_ID_PENDING",
    GET_POST_BY_ID_RESOLVE: "GET_POST_BY_ID_RESOLVE",
    GET_POST_BY_ID_REJECT: "GET_POST_BY_ID_REJECT",

    DELETE_POST_BY_ID_PENDING: "DELETE_POST_BY_ID_PENDING",
    DELETE_POST_BY_ID_RESOLVE: "DELETE_POST_BY_ID_RESOLVE",
    DELETE_POST_BY_ID_REJECT: "DELETE_POST_BY_ID_REJECT",

    LIKE_POST_BY_ID_PENDING: "LIKE_POST_BY_ID_PENDING",
    LIKE_POST_BY_ID_RESOLVE: "LIKE_POST_BY_ID_RESOLVE",
    LIKE_POST_BY_ID_REJECT: "LIKE_POST_BY_ID_REJECT",

    UNLIKE_POST_BY_ID_PENDING: "UNLIKE_POST_BY_ID_PENDING",
    UNLIKE_POST_BY_ID_RESOLVE: "UNLIKE_POST_BY_ID_RESOLVE",
    UNLIKE_POST_BY_ID_REJECT: "UNLIKE_POST_BY_ID_REJECT"
};

export const COMMENT_ACTION = {
    ADD_COMMENT_PENDING: "ADD_COMMENT_PENDING",
    ADD_COMMENT_RESOLVE: "ADD_COMMENT_RESOLVE",
    ADD_COMMENT_REJECT: "ADD_COMMENT_REJECT",

    EDIT_COMMENT_BY_ID_PENDING: "EDIT_COMMENT_BY_ID_PENDING",
    EDIT_COMMENT_BY_ID_RESOLVE: "EDIT_COMMENT_BY_ID_RESOLVE",
    EDIT_COMMENT_BY_ID_REJECT: "EDIT_COMMENT_BY_ID_REJECT",

    DELETE_COMMENT_BY_ID_PENDING: "DELETE_COMMENT_BY_ID_PENDING",
    DELETE_COMMENT_BY_ID_RESOLVE: "DELETE_COMMENT_BY_ID_RESOLVE",
    DELETE_COMMENT_BY_ID_REJECT: "DELETE_COMMENT_BY_ID_REJECT"
};
