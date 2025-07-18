// auth modules
import AuthLogin from '@/modules/Auth/Login/module'

// App modules
import Dashboard from '@/modules/Dashboard/module'
import Calendar from '@/modules/Calendar/module'
import Setting from '@/modules/Setting/module'
import Story from '@/modules/Story/module'
import Sessions from '@/modules/Sessions/module'
import Users from '@/modules/Users/module'


export default {
  Auth: {
    Login: AuthLogin,
  },
  Dashboard: {
    Dashboard: Dashboard,
  },
  Calendar: {
    Calendar: Calendar,
  },
  Setting: {
    Setting: Setting,
  },
  Story: {
    Story: Story,
  },
  Sessions: {
    Sessions: Sessions,
  },
  Users: {
    Users: Users,
  },
}
