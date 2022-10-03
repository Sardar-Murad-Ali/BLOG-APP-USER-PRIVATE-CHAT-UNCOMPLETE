import { useAppContext } from '../context/appContext'

const Alert = ({alertText,alertType}) => {
  return(

         <div className={`alert alert-${alertType}`}>{alertText}</div>
      )

  
}

export default Alert
