
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";


export default function TopBrand (props) {
    
    const { classes, logo, logoText, rtlActive } = props;

    return (
        <div className={classes.logo}>
            <a
                href={"/adm/bad-link-test"/*window.location.origin*/}
                className={classNames(classes.logoLink, {
                    [classes.logoLinkRTL]: rtlActive
                })}
                target=""//"_blank"
            >
                <div className={classes.logoImage}>
                    <img src={logo} alt="logo" className={classes.img} />
                </div>
                {logoText}
            </a>
        </div>
    );
}

TopBrand.propTypes = {
    rtlActive: PropTypes.bool,
    logo: PropTypes.string,
    logoText: PropTypes.string,
    classes: PropTypes.object,
};
