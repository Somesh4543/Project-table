import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { deleteGroup, getAllGroupsList, getGroupList } from "../redux/actions/groupActions";
import "./table.css";

function MyComponent() {
  const dispatch = useDispatch();

  const [groupList, setGroupList] = useState(null);
  const [editId, setEditId] =useState('');
  const [group, setGroup] = useState({
      name: "",
      comment: "",
      id: "",
      createddate: "",
      createdby: "",
      updateddate: "",
      updatedby: "",
    });
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    // get the group values
    // show the group list on the table
    try {
      const response = await dispatch(getGroupList())
      const payload = response.payload
      if (payload) {
          setGroupList(payload.data)
      }
    } catch (error) {
        console.log(error.message)
    }
  };

  const handleAdd = () => {
      const addData = {
        name: "",
        comment: "",
        id: "Add",
        createddate: "",
        createdby: "",
        updateddate: "",
        updatedby: "",
      }
      groupList.push(addData);
      setAddMode(true) 

  }


  const handleChange = (e) => {
      const value = e.taget.value;
      const name = e.target.name;
      setGroup({ [name]:value })
  }

  const handleEdit = (rowIndex) => {
    setAddMode(false) 
    setEditMode(true)
    setEditId(rowIndex.id)
  };

  const handleDelete = async(rowIndex) => {
    try {  
        const response = await dispatch(deleteGroup(rowIndex.id))
            const payload = response?.payload
            if (payload) {
              if (payload.status === 200) {
                getGroups()
              } 
            }
    } catch (error) {
        console.log(error.message)
    }
  };

  const handleCancel = () =>{
    setEditMode(false)
    setEditId('')
  }

  const handleUpdate = () => {

  }

  if (!groupList){
      return false 
  }

  return (
    <div className="tableWrapper m-3">
      <div className="table">
        <div>
          <h2>Group</h2>
        </div>
        <div className="button">
          <button onClick={handleAdd}>Add</button>
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
            cell:(rowIndex) => {
               if ((rowIndex.id === editId && editMode) || (rowIndex.id === 'Add' && addMode)){ return <input name="name" onChange={handleChange}  />}
               else return rowIndex.name
            }
          },
          {
            name: "Comment",
            sortable: true,
            cell:(rowIndex) => {
                if ((rowIndex.id === editId && editMode) || (rowIndex.id === 'Add' && addMode)){  return <input  name="comments" onChange={handleChange} />}
                else return rowIndex.name
            }
          },
          {
            name: "Created by",
            sortable: true,
            cell:(rowIndex) => {
                if ((rowIndex.id === editId && editMode) || (rowIndex.id === 'Add' && addMode)){ return <input  name="createdby" onChange={handleChange} />}
                else return rowIndex.createdby
            }
          },
          {
            name: "Updated by",
            sortable: true,
            cell:(rowIndex) => {
                if ((rowIndex.id === editId && editMode) || (rowIndex.id === 'Add' && addMode)){ return <input  name="updatedby" onChange={handleChange} />}
                else return rowIndex.name
            }
          },
          {
            name: "Edit",
            button: true,
            cell: (rowIndex) =>{ 
                if((rowIndex.id === editId && editMode) || (rowIndex.id === 'Add' && addMode)) {
                    return  <button onClick={() => handleCancel()}>Cancel</button>
                } else {
                    return  <button onClick={() => handleEdit(rowIndex)}>Edit</button>
                }
            },
          },
          {
            name: "Delete",
            button: true,
            cell: (rowIndex) => {
                if((rowIndex.id === editId && editMode) || (rowIndex.id === 'Add' && addMode)) {
                     return  <button onClick={() => handleUpdate()}>{addMode ? 'Save' : 'Update'}</button>
                } else {
                  return    <button onClick={() => handleDelete(rowIndex)}>Delete</button>
                }
            },
          },
        ]}
        data={groupList}
        dense
      />
    </div>
  );
}

export default MyComponent;
