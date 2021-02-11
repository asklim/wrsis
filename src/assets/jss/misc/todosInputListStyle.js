
import { 
    primaryColor,
    /*  warningColor,
    dangerColor,
    successColor,*/
    infoColor,
    //roseColor,
    //grayColor, 
    defaultFont,
} from "assets/jss/m-d-r/material-dashboard-react.js";


const todosInputListStyle = (/*theme*/) => ({

    todosInput: {
        ...defaultFont,
        textAlign: "center",
        color: primaryColor[0]
    },
    todosList: {
        ...defaultFont,
        color: primaryColor[0]
    },
    todosPopUp: {
        avatar: {
            backgroundColor: infoColor[3],
            color: primaryColor[0], 
        }
    },
/*  avatar: {
    backgroundColor: roseColor[3],
    color: primaryColor[0],
  },*/
});

export default todosInputListStyle;
