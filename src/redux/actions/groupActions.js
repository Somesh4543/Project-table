import { GroupService } from "../../Services/GroupServices";
import { CREATE_GROUP, GET_ALL_GROUPS, UPDATE_GROUP } from "./actionTypes";

export const getGroupList = () => {
  return (dispatch) => {
    return GroupService.getGroups()
      .then((response) => {
        return dispatch({ type: GET_ALL_GROUPS, payload: response });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const createGroup = (data) => {
  return (dispatch) => {
    return GroupService.createGroup(data)
      .then((response) => {
        return dispatch({ type: CREATE_GROUP, payload: response });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const updateGroup = (data) => {
  return (dispatch) => {
    return GroupService.updateGroup(data)
      .then((response) => {
        return dispatch({ type: UPDATE_GROUP, payload: response });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const deleteGroup = (id) => {
  return (dispatch) => {
    return GroupService.deleteGroupById(id)
      .then((response) => {
        return dispatch({ type: UPDATE_GROUP, payload: response });
      })
      .catch((err) => {
        throw err;
      });
  };
};
