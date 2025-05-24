// auth modules
import AuthLogin from '@/modules/Auth/Login/module'

// App modules
import Dashboard from '@/modules/Dashboard/module'
import Calendar from '@/modules/Calendar/module'


export default {
  Auth: {
    Login: AuthLogin,
  },
  Users: {
    Users: Dashboard,
  },
  Calendar: {
    Calendar: Calendar,
  },
}
