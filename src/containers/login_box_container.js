import LoginBox from '../components/login_box/login_box.js'
import { connect } from 'react-redux'
import { saveToken, hasLogin } from '../actions/index.js'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
	saveToken: token => dispatch(saveToken(token)),
	hasLogin: () => dispatch(hasLogin())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginBox)