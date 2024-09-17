
import './App.css';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"

function App() {
  var res = "Enter Key"
  var [response, setResponse] = useState(res)
  let [isSetPage, setIsSetPage] = useState(true)
  let [expiryTime, setExpiryTime] = useState('160')



  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()



  const onSubmit = async (data) => {
    // console.log(data)    

    var key = String(data['key'])
    var val = String(data['val'])

    var url;
    var methodd
    if (val.length > 0 && expiryTime > 0&& isSetPage) {
      url = `http://localhost:9000/set_key?key=${key}&val=${val}&expiry=${expiryTime}`;
      methodd = "POST";
    } else {
      url = `http://localhost:9000/get_key?key=${key}`;
      methodd = "GET";
    }

    let response = await fetch(url, {
      method: methodd,

    })

    res = await response.text()
    var resp = JSON.parse(res)
    const getPayload = () => {
      setResponse(JSON.parse(res))
      console.log(JSON.parse(res));
      if (!resp.status){
        alert(JSON.parse(res).message)
      }
      
    };
    getPayload();
  }


  const handleChange = (e) => {
    setExpiryTime(e.target.value)
  }
  
  
  return (
    <div className="App">
      <h3 class="m-3">{isSetPage ? 'Set LRU Cache using React' : 'Get LRU Cache using React'}</h3>

      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <div class="flex flex-column">
          <div class="ms-3">
          <label  class="me-2">Key :  </label>
          <input type='text' placeholder='Enter key (required)' class="mb-1"  {...register("key", { required: true })}></input>
          </div>
          {isSetPage && 
          <>
          <div>
          <label  class="me-3">Value : </label>
            <input type='text' placeholder='' class="mb-1" {...register("val")}></input>
          </div>
          <div>
            <label class="me-2">Expiry : </label>
            <input type='number' placeholder='Optional, for setting cache' 
              value={expiryTime} onChange={handleChange} class="mb-1" />
              <p>Current Value: {expiryTime}</p>
          </div>
            </>}
        </div>

        {/* <button onClick={() => { setValue(value  + 2)}}  type='submit'>Set</button>  */}
        <button type='submit' class="btn btn-warning m-3"> Submit </button>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
            <label className="form-check-label " htmlFor="flexSwitchCheckDefault">
              Get page
            </label>
          <div className="form-check form-switch h-[10px] w-[15px]  p-2 m-0 ">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              style={{margin:'auto'}}
              id="flexSwitchCheckDefault"
              checked={isSetPage}
              onChange={() => setIsSetPage(prevState => !prevState)}
            />
          </div>
            <label className="form-check-label " htmlFor="flexSwitchCheckDefault">
              Set page
            </label>
        </div>

     
      </form>


      {/* <button type="button" class="btn btn-primary btn-toggle" > Switch to {!isSetPage ? 'Set' : 'Get'} page</button> */}
      <hr className="my-4" />
      
      <h3>Value</h3>

      {isSetPage&&response!=='Enter Key'?
      <div>{response.status?'Successfully added':'failed to add'}</div>:<>{response.val}</>
      }

    </div>
  );
}

export default App;
