
import React, { useEffect, useState } from "react";
import Button from "mui-button";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { useDispatch, connect } from "react-redux";
import {
    createGroup,
    deleteGroup,
    getGroupList,
    updateGroup,
} from "../redux/actions/groupActions";


function MUI(props) {
    const dispatch = useDispatch();
    const {groups} = props;

  const [group, setGroup] = useState({
    name: "",
    comments: "",
    id: "",
    createddate: "",
    createdby: "",
    updateddate: "",
    updatedby: "",
});
const [groupAdd, setGroupAdd] = useState({
    name: "",
    comments: "",
    id: "",
    createdby: "",
});
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [error, setError] = useState({msg: '', status: ''})

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    // get the group values
    // show the group list on the table
    try {
         await dispatch(getGroupList())
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAdd = async()=> {
      let error, msg;
    if(!groupAdd.name) {
        error = true;
        msg = 'Name'
    }
    else if(!groupAdd.comments) {
        error = true;
        msg = 'Comments'
    }
    else if(!groupAdd.createdby) {
        error = true;
        msg = 'Created By'
    }
    setError({status:error,msg})
    if (error){
        return false
    }
        const data = {
            name: groupAdd.name,
            comments: groupAdd.comments,
            id: "",
            createddate: new Date(),
            createdby: groupAdd.createdby,
            updateddate: "",
            updatedby: "",
        }
        try {
            const response = await dispatch(createGroup(data));
            const payload = response.payload;
            if (payload) {
                getGroups()
                setGroupAdd({
                    name: "",
                    comments: "",
                    id: "",
                    createdby: "",
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
      if (editMode) {
          setGroup({...newGroup, [name]: value });
      } else {
        setGroupAdd({...groupAdd, [name]: value})
      }
  };

  const handleEdit = (rowIndex) => {
      const groupObj = groups.find(obj=> parseInt(obj.id) === parseInt(rowIndex.row.id))
      console.log(rowIndex)
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
    setEditId(rowIndex.row.id);
  };


  const handleDelete = async (rowIndex) => {
    try {
      const response = await dispatch(deleteGroup(rowIndex.row.id));
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
    resetGroup()
    setError({msg:'', status:false})
  };

  const handleUpdate = async() => {
    let error, msg;
    if(!group.name) {
        error = true;
        msg = 'Name'
    }
    else if(!group.comments) {
        error = true;
        msg = 'Comments'
    }
    else if(!group.updatedby) {
        error = true;
        msg = 'Updated By'
    }
    setError({status:error,msg})
    if (error){
        return false
    }
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
            resetGroup()
        }
      } catch (error) {
        console.log(error.message);
      }
  };

  const resetGroup = () =>{
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

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                }}
            >
                <h2>Group Name</h2>
                <div>
                   <span style={{color:"red"}} >{error.status ? `${error.msg} field is mandatory` : ''}</span>
                </div>
                <div className="addBlock">
                    <Stack direction="row" spacing={2} >
                    <input name="name" placeholder="Name" value={groupAdd.name} onChange={handleChange} />
                    <input name="comments" placeholder="Comments" value={groupAdd.comments} onChange={handleChange} />
                    <input name="createdby" placeholder="Created by" value={groupAdd.createdby}  onChange={handleChange} />
                        <Button onClick={() => handleAdd()}>Add</Button>
                    </Stack>
                </div>
            </div>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={groups}
                    columns={[
                        { field: "id", headerName: "ID", width: 70 },
                        {
                            field: "name", headerName: "Group name", flex: 2,
                            renderCell: (rowIndex) => {
                                if (rowIndex.row.id === editId && editMode) {
                                    return <input name="name" value={group.name} onChange={handleChange} />;
                                  } else return rowIndex.row.name;
                            }
                        },
                        {
                            field: "comments", headerName: "Comments", flex: 3,
                            renderCell: (rowIndex) => {
                                if (rowIndex.row.id === editId && editMode) {
                                    return <input name="comments" value={group.comments} onChange={handleChange} />;
                                  } else return rowIndex.row.comments;
                            }
                        },
                        { field: "createdby", headerName: "Created By", flex: 2},
                        {
                            field: "updatedby", headerName: "Updated By", flex: 2,
                            renderCell: (rowIndex) => {
                                if (rowIndex.row.id === editId && editMode) {
                                    return <input name="updatedby" value={group.updatedby} onChange={handleChange} />;
                                  } else return rowIndex.row.updatedby;
                            }
                        },
                        {
                            field: "edit",
                            description: "edit",
                            sortable: false,
                            flex: 1,
                            renderCell: (rowIndex) => {
                                if (rowIndex.row.id === editId && editMode) {
                                    return <Button size="small" variant="contained" onClick={() => handleUpdate(rowIndex)}>UPDATE</Button>
                                  } else {
                                    return (
                                        <Button size="small" variant="contained" onClick={() => handleEdit(rowIndex)}>EDIT</Button>
                                    );
                                  }
                            },
                        },
                        {
            
                            field: 'delete',
                          description: 'delete',
                          sortable: false,
                          flex: 1,
                          renderCell: (rowIndex) => {
                              if (rowIndex.row.id === editId && editMode) {
                                return <Button  size="small" variant="contained" onClick={() => handleCancel()}>CANCEL</Button>
                              } else {
                                return (
                                    <Button  size="small" variant="contained" onClick={() => handleDelete(rowIndex)}>DELETE</Button>
                                );
                              }
                          }
                        },
                    ]}
                />
            </div>
        </>
    );
}


const mapStateToProps = (state)=> {
    return{ groups : state.groupReducer.groups}
 }
 
 export default connect(mapStateToProps)(MUI);