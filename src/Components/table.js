import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, connect } from "react-redux";
import {
    createGroup,
  deleteGroup,
  getGroupList,
  updateGroup,
} from "../redux/actions/groupActions";
import "./table.css";

function MyComponent(props) {
  const dispatch = useDispatch();
    const {groups} = props;

  const [groupList, setGroupList] = useState(null);
  const [group, setGroup] = useState({
    name: "",
    comments: "",
    id: "",
    createddate: "",
    createdby: "",
    updateddate: "",
    updatedby: "",
});
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    // get the group values
    // show the group list on the table
    try {
        await dispatch(getGroupList());
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAdd = async()=> {
    console.log(group)
    const data = {
        name: group.name,
        comments: group.comments,
        id: "",
        createddate: new Date(),
        createdby: group.createdby,
        updateddate: "",
        updatedby: "",
    }
    try {
        const response = await dispatch(createGroup(data));
        const payload = response.payload;
        if (payload) {
            getGroups()
            setGroup({
                name: "",
                comments: "",
                id: "",
                createddate: "",
                createdby: "",
                updateddate: "",
                updatedby: "",
            })
        }
      } catch (error) {
        console.log(error.message);
      }

  };

  const handleChange = (e) => {
      const value = e.target.value;
      const name = e.target.name;
      const newGroup = {...group}
      setGroup({...newGroup, [name]: value });
  };

  const handleEdit = (rowIndex) => {
      const groupObj = groups.find(obj=> parseInt(obj.id) === parseInt(rowIndex.id))
      setGroup({
        name: groupObj.name,
        comments: groupObj.comments,
        id: groupObj.id,
        createddate: groupObj.createddate,
        createdby: groupObj.createdby,
        updateddate: groupObj.updateddate,
        updatedby: groupObj.updatedby,
      })
    setEditMode(true);
    setEditId(rowIndex.id);
  };


  const handleDelete = async (rowIndex) => {
    try {
      const response = await dispatch(deleteGroup(rowIndex.id));
      const payload = response?.payload;
      if (payload) {
        if (payload.status === 200) {
          getGroups();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditId("");
  };

  const handleUpdate = async() => {
    const data = {
        name: group.name,
        comments: group.comments,
        id: group.id,
        createddate: group.createddate,
        createdby: group.createdby,
        updatedby: group.updatedby,
        updateddate: new Date(),
    }
    try {
        const response = await dispatch(updateGroup(data));
        const payload = response.payload;
        if (payload) {
            setEditMode(false)
            setEditId('')
            getGroups()
            setGroup({
                name: "",
                comments: "",
                id: "",
                createddate: "",
                createdby: "",
                updateddate: "",
                updatedby: "",
            })
        }
      } catch (error) {
        console.log(error.message);
      }
  };

  if (!groups) {
    return false;
  }

  return (
    <div className="tableWrapper m-3">
      <div className="table">
        <div>
          <h2>Group</h2>
        </div>
        <div className="button">
          {/* <button onClick={handleAdd}>Add</button> */}
        </div>
      </div>

      <DataTable
        columns={[
          {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
          },
          {
            name: "Group Name",
            sortable: true,
            cell: (rowIndex) => {
              if (rowIndex.id === editId && editMode) {
                return <input name="name" value={group.name} onChange={handleChange} />;
              } else return rowIndex.name;
            },
          },
          {
            name: "Comments",
            sortable: true,
            cell: (rowIndex) => {
              if (rowIndex.id === editId && editMode) {
                return <input name="comments" value={group.comments} onChange={handleChange} />;
              } else return rowIndex.comments;
            },
          },
          {
            name: "Created by",
            sortable: true,
            selector: (row) => row.createdby,
          },
          {
            name: "Updated by",
            sortable: true,
            cell: (rowIndex) => {
              if (rowIndex.id === editId && editMode) {
                return <input name="updatedby" value={group.updatedby} onChange={handleChange} />;
              } else return rowIndex.updatedby;
            },
          },
          {
            name: "Edit",
            button: true,
            cell: (rowIndex) => {
              if (rowIndex.id === editId && editMode) {
                return <button onClick={() => handleUpdate()}>Update</button>;
              } else {
                return (
                  <button onClick={() => handleEdit(rowIndex)}>Edit</button>
                );
              }
            },
          },
          {
            name: "Delete",
            button: true,
            cell: (rowIndex) => {
              if (rowIndex.id === editId && editMode) {
                return <button onClick={() => handleCancel()}>Cancel</button>;
              } else {
                return (
                  <button onClick={() => handleDelete(rowIndex)}>Delete</button>
                );
              }
            },
          },
        ]}
        data={groups}
        dense
      />
      <div className="addBlock">
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="comments" placeholder="Comments" onChange={handleChange} />
        <input name="createdby"  onChange={handleChange} />
        <button onClick={() => handleAdd()}>Add</button>
        <button onClick={() => handleCancel()}>Cancel</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state)=> {
   return{ groups : state.groupReducer.groups}
}

export default connect(mapStateToProps)(MyComponent);
