// auth modules
import AuthLogin from '@/modules/Auth/Login/module'

// App modules
import Dashboard from '@/modules/Dashboard/module'
import Calendar from '@/modules/Calendar/module'
import Setting from '@/modules/Setting/module'
import Story from '@/modules/Story/module'
import Sessions from '@/modules/Sessions/module'


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
  Setting: {
    Setting: Setting,
  },
  Sessions: {
    Sessions: Sessions,
  },
}
