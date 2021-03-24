require('colors');

const { saveDB, readDB } = require('./helpers/saveFile');
const { inquirerMenu, 
        pause, 
        readInput, 
        listTasksDelete,
        confirm,
        showListChecklist
} = require('./helpers/inquirer');

const Tasks = require('./models/tasks');

console.clear();

const main = async () => {

    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if( tasksDB ) { //load the tasks
       tasks.loadTasksFromArray( tasksDB );
    }

    do {

        //Print menu
       opt =  await inquirerMenu();
       
       switch ( opt ) {
           case '1':
               //Create option
               const desc = await readInput('Description:');
               tasks.createTask( desc );
            break;

            case '2':
               tasks.completedList();
            break;

            case '3'://List completed
                tasks.listPendingCompleted( true );
             break;

             case '4'://List pending
                tasks.listPendingCompleted( false );
             break;

             case '5': // completed | pendient
             const ids = await showListChecklist( tasks.listArr );
             tasks.toggleCompleted( ids );
             break;

             case '6'://Delete
                const id = await listTasksDelete( tasks.listArr );
                if ( id !== '0' ) {
                  const ok = await confirm('Are you sure?');
                  if ( ok ) {
                      tasks.deleteTask( id );
                      console.log('Task deleted');
                  }
              }

             break;
       
       }

       saveDB( tasks.listArr );

       await pause();

    } while ( opt !== '0');

    //pause();

}

main();