const handleError = function(e){
    socket.logger.error(e.message);
};

const removeDupe = async function(bundle){
    try{
        if(bundle.status.completed){
            var dupeResponse = await socket.post('share/find_dupe_paths',{
                path: `${bundle.target}`
            });
            if(dupeResponse.length > 1){
                socket.post(`queue/bundles/${bundle.id}/remove`,{
                    "remove_finished": true
                });
                return bundle;
            }
        }
    }catch(err){
        handleError(err);
    }
    return null;
};

const removeDupes = async function(bundles){
    if(bundles.length > 0){
        var removed = [];
        var result;
        for(var i = 0; i < bundles.length; i++){
            result = await removeDupe(bundles[i]);
            if(result != null){
                removed.push(result);
            }
        }
        if(removed.length > 0){
            var bundleNames = removed.map(bundle => bundle.name);
            var bundleTargets = removed.map(bundle => bundle.target);
            socket.post('share/refresh/paths',{
                paths: bundleTargets,
                priority_type: 'scheduled'
            });
            socket.post('events',{
                text: `Removed dupe queue bundles: ${bundleNames}`,
                severity: 'info'
            });
        }
    }
};

socket.get('hash/stats')
.then(hasherStats => {
    if(hasherStats.hashers == 0){
        socket.get('queue/bundles/0/10000')
            .then(bundles => removeDupes(bundles))
            .catch(error => handleError(error));
    }
})
.catch(error => handleError(error));
