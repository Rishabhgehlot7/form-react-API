import axios, { toFormData } from "axios";
import { useEffect, useState } from "react";


function App() {
  const [userData, setUserData] = useState([])
  const getData = () => {
    let api = "https://raipradeep.in/form-api/viewUser.php"
    axios.get(api)
      .then((response) => {
        setUserData(response.data.dataList)
        console.log(response.data.dataList
        )
      })
  }

  useEffect(() => {
    getData()
    // deleteRow()
  }, [])

  const deleteRow = (id) => {
    let api = "https://raipradeep.in/form-api/deleteUser.php"
    if (window.confirm("Are you want delete this data"))
      axios.get(api, {
        params: {
          enid: id
        }
      })
        .then((response) => {
          getData()

        })
  }

  let saveData = (e) => {
    e.preventDefault();
    let userData = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      password: e.target.password.value,
      id:input.id
    }
    axios.post("https://raipradeep.in/form-api/saveUser.php", toFormData(userData))
      .then((res) => {
        getData()
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const [input, setinput] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    id: ""
  })

  let getInput = (e) => {
    let data = { ...input };
    data[e.target.name] = e.target.value;
    setinput(data)
  }

  const [editupData, setEditupData] = useState([])
  let editData = ((upd) => {
    let api = "https://raipradeep.in/form-api/viewUser.php";
    axios.get(api, {
      params: {
        editId: upd
      }
    })
      .then((res) => {
        setEditupData(res.data.dataList)
        setinput({
          name: res.data.dataList.en_name,
          email: res.data.dataList.en_email,
          password: res.data.dataList.en_password,
          id: res.data.dataList.en_id,
          mobile: res.data.dataList.en_contact,
        })
        console.log(input);
      })
  })
  return (
    <>
      <div className="container-fluid ">
        <div className='container'>
          <h1 className="display-1">Form</h1>
          <form onSubmit={saveData}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" onChange={getInput} id="name" aria-describedby="myname" name="name" value={input.name}/>
              <div id="myname" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="number" className="form-label">Phone Number</label>
              <input type="number" className="form-control" onChange={getInput} id="number" aria-describedby="mynumber" name="mobile" value={input.mobile} />
              <div id="mynumber" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="emial" className="form-label">Email address</label>
              <input type="text" className="form-control" onChange={getInput} id="emial" aria-describedby="emailHelp" name="email" value={input.email}/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={getInput} id="exampleInputPassword1" name="password" value={input.password} />
            </div>
            <button type="submit" className="btn btn-primary" onChange={getInput}>Submit</button>
          </form>
          <h1 className="display-1 mt-4">Table</h1>
          <table className="table mt-5 border">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Password</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                userData.length > 0 ?
                  userData.map((v, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i}</th>
                        <td>{v.en_name}</td>
                        <td>{v.en_email}</td>
                        <td>{v.en_contact}</td>
                        <td>{v.en_password}</td>
                        <td><button onClick={() => {
                          editData(v.en_id)
                        }}>Edit</button></td>
                        <td><button onClick={() => {
                          deleteRow(v.en_id)
                        }} >Delete</button></td>
                      </tr>
                    )
                  })
                  : "No data"
              }


            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;
