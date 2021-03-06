const compare = function (a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

const types = [
    {
        id: '/favorite_hubs/listeners/favorite_hub_updated',
        name: '/favorite_hubs/listeners/favorite_hub_updated'
    }
    , {
        id: '/favorite_hubs/listeners/favorite_hub_created',
        name: '/favorite_hubs/listeners/favorite_hub_created'
    }
    , {
        id: '/favorite_hubs/listeners/favorite_hub_updated',
        name: '/favorite_hubs/listeners/favorite_hub_updated'
    }
    , {
        id: '/favorite_hubs/listeners/favorite_hub_removed',
        name: '/favorite_hubs/listeners/favorite_hub_removed'
    }
    , {
        id: '/events/listeners/event_counts',
        name: '/events/listeners/event_counts'
    }
    , {
        id: '/events/listeners/event_message',
        name: '/events/listeners/event_message'
    }
    , {
        id: '/extensions/listeners/extension_created',
        name: '/extensions/listeners/extension_created'
    }
    , {
        id: '/extensions/listeners/extension_removed',
        name: '/extensions/listeners/extension_removed'
    }
    , {
        id: '/extensions/listeners/extension_package_updated',
        name: '/extensions/listeners/extension_package_updated'
    }
    , {
        id: '/extensions/listeners/extension_installation_started',
        name: '/extensions/listeners/extension_installation_started'
    }
    , {
        id: '/extensions/listeners/extension_installation_succeeded',
        name: '/extensions/listeners/extension_installation_succeeded'
    }
    , {
        id: '/extensions/listeners/extension_installation_failed',
        name: '/extensions/listeners/extension_installation_failed'
    }
    , {
        id: '/extensions/listeners/extension_started',
        name: '/extensions/listeners/extension_started'
    }
    , {
        id: '/extensions/listeners/extension_stopped',
        name: '/extensions/listeners/extension_stopped'
    }
    , {
        id: '/extensions/listeners/extension_updated',
        name: '/extensions/listeners/extension_updated'
    }
    , {
        id: '/extensions/listeners/extension_settings_updated',
        name: '/extensions/listeners/extension_settings_updated'
    }
    , {
        id: '/filelists/listeners/filelist_created',
        name: '/filelists/listeners/filelist_created'
    }
    , {
        id: '/filelists/listeners/filelist_removed',
        name: '/filelists/listeners/filelist_removed'
    }
    , {
        id: '/filelists/listeners/filelist_directory_download_added',
        name: '/filelists/listeners/filelist_directory_download_added'
    }
    , {
        id: '/filelists/listeners/filelist_directory_download_removed',
        name: '/filelists/listeners/filelist_directory_download_removed'
    }
    , {
        id: '/filelists/listeners/filelist_directory_download_processed',
        name: '/filelists/listeners/filelist_directory_download_processed'
    }
    , {
        id: '/filelists/listeners/filelist_directory_download_failed',
        name: '/filelists/listeners/filelist_directory_download_failed'
    }
    , {
        id: '/filelists/listeners/filelist_updated',
        name: '/filelists/listeners/filelist_updated'
    }
    , {
        id: '/hash/listeners/hash_database_status',
        name: '/hash/listeners/hash_database_status'
    }
    , {
        id: '/hash/listeners/hasher_directory_finished',
        name: '/hash/listeners/hasher_directory_finished'
    }
    , {
        id: '/hash/listeners/hasher_finished',
        name: '/hash/listeners/hasher_finished'
    }
    , {
        id: '/hash/listeners/hash_statistics',
        name: '/hash/listeners/hash_statistics'
    }
    , {
        id: '/hubs/listeners/hub_created',
        name: '/hubs/listeners/hub_created'
    }
    , {
        id: '/hubs/listeners/hub_removed',
        name: '/hubs/listeners/hub_removed'
    }
    , {
        id: '/private_chat/listeners/private_chat_created',
        name: '/private_chat/listeners/private_chat_created'
    }
    , {
        id: '/private_chat/listeners/private_chat_removed',
        name: '/private_chat/listeners/private_chat_removed'
    }
    , {
        id: '/queue/listeners/queue_bundle_added',
        name: '/queue/listeners/queue_bundle_added'
    }
    , {
        id: '/queue/listeners/queue_bundle_updated',
        name: '/queue/listeners/queue_bundle_updated'
    }
    , {
        id: '/queue/listeners/queue_bundle_status',
        name: '/queue/listeners/queue_bundle_status'
    }
    , {
        id: '/queue/listeners/queue_bundle_priority',
        name: '/queue/listeners/queue_bundle_priority'
    }
    , {
        id: '/queue/listeners/queue_bundle_tick',
        name: '/queue/listeners/queue_bundle_tick'
    }
    , {
        id: '/queue/listeners/queue_bundle_content',
        name: '/queue/listeners/queue_bundle_content'
    }
    , {
        id: '/queue/listeners/queue_bundle_sources',
        name: '/queue/listeners/queue_bundle_sources'
    }
    , {
        id: '/queue/listeners/queue_bundle_removed',
        name: '/queue/listeners/queue_bundle_removed'
    }
    , {
        id: '/queue/listeners/queue_file_added',
        name: '/queue/listeners/queue_file_added'
    }
    , {
        id: '/queue/listeners/queue_file_updated',
        name: '/queue/listeners/queue_file_updated'
    }
    , {
        id: '/queue/listeners/queue_file_priority',
        name: '/queue/listeners/queue_file_priority'
    }
    , {
        id: '/queue/listeners/queue_file_tick',
        name: '/queue/listeners/queue_file_tick'
    }
    , {
        id: '/queue/listeners/queue_file_sources',
        name: '/queue/listeners/queue_file_sources'
    }
    , {
        id: '/queue/listeners/queue_file_status',
        name: '/queue/listeners/queue_file_status'
    }
    , {
        id: '/queue/listeners/queue_file_removed',
        name: '/queue/listeners/queue_file_removed'
    }
    , {
        id: '/search/listeners/search_instance_created',
        name: '/search/listeners/search_instance_created'
    }
    , {
        id: '/search/listeners/search_instance_removed',
        name: '/search/listeners/search_instance_removed'
    }
    , {
        id: '/search/listeners/search_types_updated',
        name: '/search/listeners/search_types_updated'
    }
    , {
        id: '/sessions/listeners/session_created',
        name: '/sessions/listeners/session_created'
    }
    , {
        id: '/sessions/listeners/session_removed',
        name: '/sessions/listeners/session_removed'
    }
    , {
        id: '/share/listeners/share_refresh_queued',
        name: '/share/listeners/share_refresh_queued'
    }
    , {
        id: '/share/listeners/share_refresh_started',
        name: '/share/listeners/share_refresh_started'
    }
    , {
        id: '/share/listeners/share_refresh_completed',
        name: '/share/listeners/share_refresh_completed'
    }
    , {
        id: '/share/listeners/share_exclude_added',
        name: '/share/listeners/share_exclude_added'
    }
    , {
        id: '/share/listeners/share_exclude_removed',
        name: '/share/listeners/share_exclude_removed'
    }
    , {
        id: '/share_profiles/listeners/share_profile_added',
        name: '/share_profiles/listeners/share_profile_added'
    }
    , {
        id: '/share_profiles/listeners/share_profile_updated',
        name: '/share_profiles/listeners/share_profile_updated'
    }
    , {
        id: '/share_profiles/listeners/share_profile_removed',
        name: '/share_profiles/listeners/share_profile_removed'
    }
    , {
        id: '/share_roots/listeners/share_root_created',
        name: '/share_roots/listeners/share_root_created'
    }
    , {
        id: '/share_roots/listeners/share_root_updated',
        name: '/share_roots/listeners/share_root_updated'
    }
    , {
        id: '/share_roots/listeners/share_root_removed',
        name: '/share_roots/listeners/share_root_removed'
    }
    , {
        id: '/system/listeners/away_state',
        name: '/system/listeners/away_state'
    }
    , {
        id: '/transfers/listeners/transfer_added',
        name: '/transfers/listeners/transfer_added'
    }
    , {
        id: '/transfers/listeners/transfer_updated',
        name: '/transfers/listeners/transfer_updated'
    }
    , {
        id: '/transfers/listeners/transfer_starting',
        name: '/transfers/listeners/transfer_starting'
    }
    , {
        id: '/transfers/listeners/transfer_completed',
        name: '/transfers/listeners/transfer_completed'
    }
    , {
        id: '/transfers/listeners/transfer_failed',
        name: '/transfers/listeners/transfer_failed'
    }
    , {
        id: '/transfers/listeners/transfer_removed',
        name: '/transfers/listeners/transfer_removed'
    }
    , {
        id: '/transfers/listeners/transfer_statistics',
        name: '/transfers/listeners/transfer_statistics'
    }
    , {
        id: '/users/listeners/user_connected',
        name: '/users/listeners/user_connected'
    }
    , {
        id: '/users/listeners/user_updated',
        name: '/users/listeners/user_updated'
    }
    , {
        id: '/users/listeners/user_disconnected',
        name: '/users/listeners/user_disconnected'
    }
    , {
        id: '/users/listeners/ignored_user_added',
        name: '/users/listeners/ignored_user_added'
    }
    , {
        id: '/users/listeners/ignored_user_removed',
        name: '/users/listeners/ignored_user_removed'
    }
    , {
        id: '/web_users/listeners/web_user_added',
        name: '/web_users/listeners/web_user_added'
    }
    , {
        id: '/web_users/listeners/web_user_updated',
        name: '/web_users/listeners/web_user_updated'
    }
    , {
        id: '/web_users/listeners/web_user_removed',
        name: '/web_users/listeners/web_user_removed'
    }
    , {
        id: '/view_files/listeners/view_file_added',
        name: '/view_files/listeners/view_file_added'
    }
    , {
        id: '/view_files/listeners/view_file_updated',
        name: '/view_files/listeners/view_file_updated'
    }
    , {
        id: '/view_files/listeners/view_file_finished',
        name: '/view_files/listeners/view_file_finished'
    }
    , {
        id: '/view_files/listeners/view_file_removed',
        name: '/view_files/listeners/view_file_removed'
    }, {
        id: '/hubs/listeners/hub_updated',
        name: '/hubs/listeners/hub_updated'
    }
    , {
        id: '/hubs/listeners/hub_counts_updated',
        name: '/hubs/listeners/hub_counts_updated'
    }
    , {
        id: '/hubs/listeners/hub_message',
        name: '/hubs/listeners/hub_message'
    }
    , {
        id: '/hubs/listeners/hub_status',
        name: '/hubs/listeners/hub_status'
    }
    , {
        id: '/hubs/listeners/hub_user_connected',
        name: '/hubs/listeners/hub_user_connected'
    }
    , {
        id: '/hubs/listeners/hub_user_updated',
        name: '/hubs/listeners/hub_user_updated'
    }
    , {
        id: '/hubs/listeners/hub_user_disconnected',
        name: '/hubs/listeners/hub_user_disconnected'
    }
    , {
        id: '/hubs/listeners/hub_text_command',
        name: '/hubs/listeners/hub_text_command'
    }
    , {
        id: '/private_chat/listeners/private_chat_updated',
        name: '/private_chat/listeners/private_chat_updated'
    }
    , {
        id: '/private_chat/listeners/private_chat_message',
        name: '/private_chat/listeners/private_chat_message'
    }
    , {
        id: '/private_chat/listeners/private_chat_status',
        name: '/private_chat/listeners/private_chat_status'
    }
    , {
        id: '/hubs/listeners/private_chat_text_command',
        name: '/hubs/listeners/private_chat_text_command'
    }
    , {
        id: '/search/listeners/search_hub_searches_queued',
        name: '/search/listeners/search_hub_searches_queued'
    }
    , {
        id: '/search/listeners/search_hub_searches_sent',
        name: '/search/listeners/search_hub_searches_sent'
    }
    , {
        id: '/search/listeners/search_result_added',
        name: '/search/listeners/search_result_added'
    }
    , {
        id: '/search/listeners/search_result_updated',
        name: '/search/listeners/search_result_updated'
    }
    , {
        id: '/search/listeners/search_user_result',
        name: '/search/listeners/search_user_result'
    }
].sort(compare);

const settings = [
    {
        key: 'path',
        title: 'Path',
        type: 'string',
        description: 'Hook the script should be executed for.',
        optional: false,
        default_value: types[0].id,
        options: types
    }
];

const parameter = ['message'];

const register = async(socket, config, callback)=>{
    return await socket.addListener(config.path.split('/')[1], config.path.split('/')[3], callback);
};

const id = 'event';
const name = 'Event';
const description = 'Executes a script based on events.';

export default {
    settings,
    parameter,
    register,
    id,
    name,
    description
}