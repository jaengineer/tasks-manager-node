const Task = require("./task");


class Tasks {

    _tasksList = {
        'abc': 123
    };

    get listArr() {

        const list = [];
        Object.keys( this._tasksList).forEach( key => {
           const task = this._tasksList[key];
           list.push( task );
        })

        return list;
    }

    constructor() {
        this._tasksList = {};
    }

    deleteTask( id = '' ) {

        if( this._tasksList[id] ) {
            delete this._tasksList[id];
        }
        
    }

    loadTasksFromArray( tasks = [] ) {

        tasks.forEach( task => {
            this._tasksList[ task.id ] = task;
        });

    }

    createTask( desc = '' ) {

        const task = new Task( desc );

        this._tasksList[task.id] = task;
    }

    completedList() {

       console.log('\n');
       this.listArr.forEach( (task, i) => {

            const idx = `${ i + 1}`.green;
            const  { desc, completedOn } = task;
            const status = ( completedOn )
                            ? 'Completed'.green
                            : 'Pending'.red;
        
            console.log( `${ idx } ${ desc } :: ${ status}`);

       });
    }

    listPendingCompleted( completed = true ) {

        console.log('\n');
        let cont = 0;
        this.listArr.forEach( (task ) => {
 
             const  { desc, completedOn } = task;
             const status = ( completedOn )
                             ? 'Completed'.green
                             : 'Pending'.red;
         
             if( completed ) {
                 //Show completed
                 if( completedOn ) {
                     cont += 1;
                     console.log( `${ (cont + '.').green } ${ desc } :: ${ completedOn }`);
                 }
             } else {

                if( !completedOn ) {
                    cont += 1;
                    console.log( `${ (cont + '.').green } ${ desc } :: ${ status}`);
                }

             }
 
        });

    }

    toggleCompleted( ids = [] ) {

        ids.forEach( id => {

            const task = this._tasksList[id];
            if ( !task.completedOn ) {
                task.completedOn = new Date().toISOString()
            }

        });

        this.listArr.forEach( task => {

            if ( !ids.includes(task.id) ) {
                this._tasksList[task.id].completedOn = null;
            }

        });


    }
}

module.exports = Tasks;