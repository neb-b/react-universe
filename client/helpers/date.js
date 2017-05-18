import moment from 'moment'

export default dateStr => moment(dateStr).format('hh:mm a ddd MM/YY')
