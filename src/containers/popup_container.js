import Popup from '../components/popup/popup.js'
import { connect } from 'react-redux'
import ACTIONS from '../actions/index.js'

const mapStateToProps = state => ({
	popup: state.popup,
})

const mapDispatchToProps = dispatch => ({
	handleClick: cont => dispatch(ACTIONS.POPUP.hiddenPopup(cont))
})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Popup)