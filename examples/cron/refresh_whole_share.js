const handleError = function(e){
    socket.logger.error(e.message);
};

const refreshShare = async function(activeTasks){
    if(activeTasks.filter(task => task.type=='refresh_all').length == 0){
        socket.post('share/refresh',{
            priority_type: 'normal'
        });
    }else{
        socket.post('events',{
            text: 'Share refresh already running/queued. Skipping.',
            severity: 'info'
        }); 
    }
};

socket.get('share/refresh/tasks')
    .then(activeTasks => refreshShare(activeTasks))
    .catch(error => handleError(error));