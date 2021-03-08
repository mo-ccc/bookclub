import React, {useEffect, useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import getNoToken from '../api/getNoToken.js'
import Facility from '../components/Facility.js'
import ModalCustom from '../components/ModalCustom.js'
import PatchFormBase from '../components/PatchFormBase.js'
import patchWithToken from '../api/patchWithToken.js'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import availabilitiesJson from '../statics/json/availabilities.json'

const FacilityManagementTab = () => {
  const [facilities, setFacilities] = useState()
  const patchForm = useForm()
  const postForm = useForm()
  const token = useSelector(state => state.token)
  const [success, setSuccess] = useState()

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
    patchWithToken(`facility/${id}`, data, token)
      .then(response => {
        setSuccess(response.status)
        if (response.status === 200) {
          fetchData()
        }
        return response
      })
  }

  const fieldAdditional = [
    ["availabilities", item.availabilities, availabilitiesJson]
  ]

  return(
    <div>
      <div className="container">
        <h1>Facility Management</h1>
        <hr/>
        <div className="row p-5 w-75">
          {facilities && facilities.map((item, i) => (
            <Facility key={i} data={item} edit={true}>
              <ModalCustom label="edit" title={item.name} size="lg">
                <PatchFormBase fields={["name", "description", ["disabled", 1], "max_capacity"]} useForm={patchForm} defaultData={item} nestedData={fieldAdditional} onSubmit={d => patchSubmit(d, item.id)}/>
              </ModalCustom>
            </Facility>
          ))}
          <ModalCustom label="+" title="adding new facility" variant="outline-dark" size="lg" >
            <h1>hi</h1>
          </ModalCustom>
        </div>
        {success &&
        <Alert variant="primary" onClose={() => setSuccess("")} dismissible>
          <p>
            {success}
          </p>
        </Alert>
        }
      </div>
    </div>
  )
}

export default FacilityManagementTab