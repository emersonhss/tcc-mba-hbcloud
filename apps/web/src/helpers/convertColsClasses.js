export default (cols) => {
    let classes = '';
    if(cols) {
        cols.split(' ').forEach((colSize, index) => {
            if(index === 0) {
                classes += `col-xs-${colSize}`;
            } else if(index === 1) {
                classes += ` col-sm-${colSize}`;
            } else if(index === 2) {
                classes += ` col-md-${colSize}`;
            } else if(index === 3) {
                classes += ` col-lg-${colSize}`;
            }
        });
    } else {
        classes += `col-xs-12`;
    }
    return classes;
};