import React, {useEffect, useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import getNoToken from '../api/getNoToken.js'
import Facility from '../components/Facility.js'
import ModalCustom from '../components/ModalCustom.js'
import FormBase from '../components/FormBase.js'
import patchWithToken from '../api/patchWithToken.js'
import postWithToken from '../api/postWithToken.js'
import deleteWithToken from '../api/deleteWithToken.js'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import availabilitiesJson from '../statics/json/availabilities.json'

const FacilityManagementTab = () => {
  const [facilities, setFacilities] = useState()
  const patchForm = useForm()
  const postForm = useForm()
  const token = useSelector(state => state.auth.token)
  const [patchSuccess, setPatchSuccess] = useState()
  const [postSuccess, setPostSuccess] = useState()

  const fetchData = () => {
    getNoToken('facility')
      .then(response => response.json())
      .then(data => setFacilities(data)) 
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  const patchSubmit = (data, id) => {
    data.disabled = data.disabled.value
    Object.keys(data.availabilities).forEach(item => data.availabilities[item] = data.availabilities[item].value)
    console.log(data)
    patchWithToken(`facility/${id}`, data, token)
      .then(response => {
        setPatchSuccess(response.status)
        if (response.status === 200) {
          fetchData()
        }else {
          patchForm.reset()
        }
        return response
      })
  }
  const postSubmit = (data) => {
    data.disabled = data.disabled.value
    Object.keys(data.availabilities).forEach(item => data.availabilities[item] = data.availabilities[item].value)
    console.log(data)
    postWithToken("facility", data, token)
      .then(response => {
        setPostSuccess(response.status)
        if (response.status === 200) {
          fetchData()
        }else {
          patchForm.reset()
        }
        return response
      })
  }
  const handleDelete = (e, id) => {
    deleteWithToken(`facility/${id}`, token)
      .then(response => {
        if (response.status === 200) {
          fetchData()
        }
      })
  }


  return(
    <div>
      <div className="container">
        <h1>Facility Management</h1>
        <hr/>
        <div className="row">
          {facilities && facilities.map((item, i) => (
            <div className="col-12 col-md-3">
            <Facility key={i} data={item} edit={true}>
              <ModalCustom label="edit" title={item.name} size="lg">
                <FormBase fields={["name", "description", ["disabled", 1], ["max_capacity", 2]]} useForm={patchForm} defaultData={item} nestedData={[["availabilities", item.availabilities, availabilitiesJson]]} onSubmit={d => patchSubmit(d, item.id)}/>
                {patchSuccess &&
                <Alert variant="primary" onClose={() => setPatchSuccess("")} dismissible>
                  <p>
                    {patchSuccess}
                  </p>
                </Alert>
                }
                <hr />
                <ModalCustom label="delete facility" title={`Are you sure you want to delete ${item.name}?`}>
                  <Button variant="danger" onClick={e => handleDelete(e, item.id)}>Yes. Delete!</Button>
                </ModalCustom>
              </ModalCustom>
            </Facility>
            </div>
          ))}
          <div className="col-12 col-md-3">
            <ModalCustom label="+" title="adding new facility" variant="outline-dark" size="lg" >
              <FormBase fields={["name", "description", ["disabled", 1], ["max_capacity", 2]]} useForm={postForm} nestedData={[["availabilities", false, availabilitiesJson]]} is_post={true} onSubmit={postSubmit}/>
              {postSuccess &&
              <Alert variant="primary" onClose={() => setPostSuccess("")} dismissible>
                <p>
                  {postSuccess}
                </p>
              </Alert>
              }
            </ModalCustom>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default FacilityManagementTab