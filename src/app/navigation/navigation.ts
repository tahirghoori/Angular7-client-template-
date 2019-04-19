import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                translate: 'NAV.DASHBOARD.TITLE',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/dashboard'               
            },
            {
                'id'       : 'social',
                'title'    : 'Social',
                'translate': 'NAV.SOCIAL.TITLE',
                'type'     : 'collapsable',
                'icon'     : 'border_all',
                'children' : [
                    {
                        'id'   : 'post',
                        'title': 'Post',
                        'translate': 'NAV.POST.TITLE',
                        'type' : 'item',
                        'url'  : '/skills'
                    }
               

                ]
            },
            {
                'id'       : 'settings',
                'title'    : 'Settings',
                'translate': 'NAV.SETTINGS.TITLE',
                'type'     : 'collapsable',
                'icon'     : 'border_all',
                'children' : [
                    {
                        'id'   : 'app_setting',
                        'title': 'App Setting',
                        'translate': 'NAV.APP_SETTING.TITLE',
                        'type' : 'item',
                        'url'  : '/settings'
                    },
                    {
                        'id'   : 'roles',
                        'title': 'Roles',
                        'translate': 'NAV.ROLES.TITLE',
                        'type' : 'item',
                        'url'  : '/roles'
                    },
                    {
                        'id'   : 'developer_option',
                        'title': 'Developer Option',
                        'translate': 'NAV.DEVELOPER_OPTION.TITLE',
                        'type' : 'item',
                        'url'  : '/developer_option'
                    }

                ]
            }
            
        ]
    }
];
