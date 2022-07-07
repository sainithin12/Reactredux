import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { bindActionCreators } from 'redux'
import * as authorActions from '../../redux/actions/authorActions'
import * as courseActions from '../../redux/actions/courseActions'
import Spinner from '../common/Spinner'
import CourseList from './CourseList'

class Courses extends Component {
	state = {
		redirectToAddCoursePage: false,
	}
	componentDidMount() {
		const { courses, authors, actions } = this.props
		if (courses.length === 0) {
			actions.loadCourses().catch((err) => alert('loading courses failed ' + err))
		}
		if (authors.length === 0) {
			actions.loadAuthors().catch((err) => alert('loading Authors failed ' + err))
		}
	}

	deleteCourse = async (courseId) => {
		toast.success('Course deleted.')
		try {
			await this.props.actions.deleteCourse(courseId)
		} catch (error) {
			toast.error('Delete failed.' + error.message, { autoClose: false })
		}
	}
	render() {
		return (
			<React.Fragment>
				{this.state.redirectToAddCoursePage && <Navigate to='react-courses/course' />}
				<h1 className='mt-5 text-center'>Courses</h1>
				{this.props.loading ? (
					<Spinner />
				) : (
					<React.Fragment>
						<button
							className='btn btn-primary my-4'
							onClick={() => this.setState({ redirectToAddCoursePage: true })}>
							Add Course
						</button>
						<CourseList courses={this.props.courses} onDeleteClick={this.deleteCourse} />
					</React.Fragment>
				)}
			</React.Fragment>
		)
	}
}
function mapStateToProps({ courses, authors, apiCallsInProgress }) {
	return {
		courses:
			authors.length === 0
				? []
				: courses.map((course) => {
						return {
							...course,
							authorName: authors.find((author) => course.authorId === author.id).name,
						}
				  }),
		authors,
		loading: apiCallsInProgress > 0,
	}
}
function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
			deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
			loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
		},
	}
}
// const mapDispatchToProps = {
//     createCourse: courseActions.createCourse,
// };
export default connect(mapStateToProps, mapDispatchToProps)(Courses)
