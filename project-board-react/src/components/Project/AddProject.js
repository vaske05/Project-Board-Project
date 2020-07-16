import React, { Component } from 'react'

class AddProject extends Component {
    render() {
        return (
            <div class="project">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 m-auto">
                            <h5 class="display-4 text-center">Create / Edit Project form</h5>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg " placeholder="Project Name" />
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" placeholder="Unique Project ID"
                                        disabled />
                                </div>
                                {/* disabled for Edit Only!! remove "disabled" for the Create operation */}
                                <div class="form-group">
                                    <textarea class="form-control form-control-lg" placeholder="Project Description"></textarea>
                                </div>
                                <h6>Start Date</h6>
                                <div class="form-group">
                                    <input type="date" class="form-control form-control-lg" name="start_date" />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div class="form-group">
                                    <input type="date" class="form-control form-control-lg" name="end_date" />
                                </div>

                                <input type="submit" class="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default AddProject;
