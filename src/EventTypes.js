module.exports = [
    {
        id: '/hubs/hooks/hub_incoming_message_hook',
        name: 'Incoming chat message'
    }
    , {
        id: '/hubs/hooks/hub_outgoing_message_hook',
        name: 'Outgoing chat message'
    }
    , {
        id: '/queue/hooks/queue_file_finished_hook',
        name: 'File finished'
    }
    , {
        id: '/queue/hooks/queue_bundle_finished_hook',
        name: 'Bundle finished'
    }
    , {
        id: '/share/hooks/share_file_validation_hook',
        name: 'File validation hook'
    }
    , {
        id: '/share/hooks/share_directory_validation_hook',
        name: 'Directory validation hook'
    }

    , {
        id: '/events/listeners/event_counts',
        name: 'Event counts updated'
    }
    , {
        id: '/events/listeners/event_message',
        name: 'Event added'
    }
    , {
        id: '/extensions/listeners/extension_created',
        name: 'Extension added'
    }
    , {
        id: '/extensions/listeners/extension_removed',
        name: 'Extension removed'
    }
    , {
        id: '/extensions/listeners/extension_package_updated',
        name: 'Extension package updated'
    }
    , {
        id: '/extensions/listeners/extension_installation_started',
        name: 'Extension installation started'
    }
    , {
        id: '/extensions/listeners/extension_installation_succeeded',
        name: 'Extension installation succeeded'
    }
    , {
        id: '/extensions/listeners/extension_installation_failed',
        name: 'Extension installation failed'
    }
    , {
        id: '/extensions/listeners/extension_started',
        name: 'Extension started'
    }
    , {
        id: '/extensions/listeners/extension_stopped',
        name: 'Extension stopped'
    }
    , {
        id: '/extensions/listeners/extension_updated',
        name: 'Extension updated'
    }
    , {
        id: '/extensions/listeners/extension_settings_updated',
        name: 'Extension settings updated'
    }
    , {
        id: '/filelists/listeners/filelist_created',
        name: 'Filelist session created'
    }
    , {
        id: '/filelists/listeners/filelist_removed',
        name: 'Filelist session removed'
    }
    , {
        id: '/filelists/listeners/filelist_directory_download_added',
        name: 'Directory download added'
    }
    , {
        id: '/filelists/listeners/filelist_directory_download_removed',
        name: 'Directory download removed'
    }
    , {
        id: '/filelists/listeners/filelist_directory_download_processed',
        name: 'Directory download processed'
    }
    , {
        id: '/filelists/listeners/filelist_directory_download_failed',
        name: 'Directory download failed'
    }
    , {
        id: '/filelists/listeners/filelist_updated',
        name: 'Filelist session updated'
    }
    , {
        id: '/hash/listeners/hash_database_status',
        name: 'Database status updated'
    }
    , {
        id: '/hash/listeners/hasher_directory_finished',
        name: 'Hashing of a directory finished'
    }
    , {
        id: '/hash/listeners/hasher_finished',
        name: 'Hashing finished'
    }
    , {
        id: '/hash/listeners/hash_statistics',
        name: 'Hash statistics'
    }
    , {
        id: '/hubs/listeners/hub_created',
        name: 'Hub session created'
    }
    , {
        id: '/hubs/listeners/hub_removed',
        name: 'Hub session removed'
    }
    , {
        id: '/queue/listeners/queue_bundle_added',
        name: 'Bundle added'
    }
    , {
        id: '/queue/listeners/queue_bundle_updated',
        name: 'Bundle updated'
    }
    , {
        id: '/queue/listeners/queue_bundle_status',
        name: 'Bundle status changed'
    }
    , {
        id: '/queue/listeners/queue_bundle_priority',
        name: 'Bundle priority updated'
    }
    , {
        id: '/queue/listeners/queue_bundle_tick',
        name: 'Bundle download progress'
    }
    , {
        id: '/queue/listeners/queue_bundle_content',
        name: 'Bundle content updated'
    }
    , {
        id: '/queue/listeners/queue_bundle_sources',
        name: 'Bundle sources updated'
    }
    , {
        id: '/queue/listeners/queue_bundle_removed',
        name: 'Bundle removed'
    }
    , {
        id: '/queue/listeners/file_added',
        name: 'File added'
    }
    , {
        id: '/queue/listeners/file_updated',
        name: 'File updated'
    }
    , {
        id: '/queue/listeners/queue_file_priority',
        name: 'File priority updated'
    }
    , {
        id: '/queue/listeners/queue_file_tick',
        name: 'File download progress'
    }
    , {
        id: '/queue/listeners/queue_file_sources',
        name: 'File sources updated'
    }
    , {
        id: '/queue/listeners/queue_file_status',
        name: 'File status changed'
    }
    , {
        id: '/queue/listeners/file_removed',
        name: 'File removed'
    }
    , {
        id: '/sessions/listeners/session_created',
        name: 'Session created'
    }
    , {
        id: '/sessions/listeners/session_removed',
        name: 'Session removed'
    }
    , {
        id: '/share/listeners/share_refresh_queued',
        name: 'Share refresh queued'
    }
    , {
        id: '/share/listeners/share_refresh_completed',
        name: 'Share refresh completed'
    }
    , {
        id: '/share/listeners/share_exclude_added',
        name: 'Excluded path added'
    }
    , {
        id: '/share/listeners/share_exclude_removed',
        name: 'Excluded path removed'
    }
    , {
        id: '/system/listeners/away_state',
        name: 'Away state changed'
    }
    , {
        id: '/transfers/listeners/transfer_added',
        name: 'Transfer added'
    }
    , {
        id: '/transfers/listeners/transfer_updated',
        name: 'Transfer updated'
    }
    , {
        id: '/transfers/listeners/transfer_starting',
        name: 'Transfer starting'
    }
    , {
        id: '/transfers/listeners/transfer_completed',
        name: 'Transfer completed'
    }
    , {
        id: '/transfers/listeners/transfer_failed',
        name: 'Transfer failed'
    }
    , {
        id: '/transfers/listeners/transfer_removed',
        name: 'Transfer removed'
    }
    , {
        id: '/transfers/listeners/transfer_statistics',
        name: 'Transfer statistics'
    }
    , {
        id: '/users/listeners/user_connected',
        name: 'User connected'
    }
    , {
        id: '/users/listeners/user_updated',
        name: 'User updated'
    }
    , {
        id: '/users/listeners/user_disconnected',
        name: 'User disconnected'
    }
    , {
        id: '/users/listeners/ignored_user_added',
        name: 'Ignored user added'
    }
    , {
        id: '/users/listeners/ignored_user_removed',
        name: 'Ignored user removed'
    }
];
