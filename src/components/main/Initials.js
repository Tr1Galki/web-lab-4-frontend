import React from "react";

class Initials extends React.Component {
    render() {
        return (
            <>
                <div className="info--student">
                    {this.props.name}
                </div>
                <div className="info--work">
                    <div className="info--work__lesson">
                        {this.props.lesson}
                    </div>
                    <div className="info--work__lab">
                        {this.props.lab}
                    </div>
                </div>
            </>
        )
    }
}

export { Initials }