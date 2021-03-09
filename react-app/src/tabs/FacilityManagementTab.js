import React, {useEffect, useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import getNoToken from '../api/getNoToken.js'
import Facility from '../components/Facility.js'
import ModalCustom from '../components/ModalCustom.js'
import FormBase from '../components/FormBase.js'
import patchWithToken from '../api/patchWithToken.js'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import availabilitiesJson from '../statics/json/availabilities.json'

const FacilityManagementTab = () => {
  const [facilities, setFacilities] = useState()
  const patchForm = useForm()
  const postForm = useForm()
  const token = useSelector(state => state.token)
  const [patchSuccess, setPatchSuccess] = useState()

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


  return(
    <div>
      <div className="container">
        <h1>Facility Management</h1>
        <hr/>
        <div className="row p-5 w-75">
          {facilities && facilities.map((item, i) => (
            <Facility key={i} data={item} edit={true}>
              <ModalCustom label="edit" title={item.name} size="lg">
                <FormBase fields={["name", "description", ["disabled", 1], "max_capacity"]} useForm={patchForm} defaultData={item} nestedData={[["availabilities", item.availabilities, availabilitiesJson]]} onSubmit={d => patchSubmit(d, item.id)}/>
                {patchSuccess &&
                <Alert variant="primary" onClose={() => setPatchSuccess("")} dismissible>
                  <p>
                    {patchSuccess}
                  </p>
                </Alert>
                }
              </ModalCustom>
            </Facility>
          ))}
          <ModalCustom label="+" title="adding new facility" variant="outline-dark" size="lg" >
            <h1>hi</h1>
          </ModalCustom>
        </div>
        
      </div>
    </div>
  )
}

export default FacilityManagementTab