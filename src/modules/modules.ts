// auth modules
import AuthLogin from '@/modules/Auth/Login/module'

// Dashboard modules
import Dashboard from '@/modules/Dashboard/module'


export default {
  Auth: {
    Login: AuthLogin,
  },
  Users: {
    Users: Dashboard,
  },
}
