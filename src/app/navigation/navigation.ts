import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        permissions    : 'ADMIN DEVELOPER',
        access    : false,
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                permissions    : 'ADMIN',
                access    : false,
                translate: 'NAV.DASHBOARD.TITLE',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/dashboard'               
            },
            {
                id       : 'social',
                title    : 'Social',
                translate: 'NAV.SOCIAL.TITLE',
                type     : 'collapsable',
                permissions    : 'ADMIN',
                access    : false,
                icon     : 'border_all',
                children : [
                    {
                        id   : 'post',
                        title: 'Post',
                        permissions    : 'ADMIN DEVELOPER',
                        access    : false,
                        translate : 'NAV.POST.TITLE',
                        type : 'item',
                        url  : '/skills'
                    }
               

                ]
            },
            {
                id       : 'settings',
                title    : 'Settings',
                translate : 'NAV.SETTINGS.TITLE',
                type     : 'collapsable',
                permissions    : 'ADMIN DEVELOPER',
                access    : false,
                icon     : 'border_all',
                children : [
                    {
                        id   : 'app_setting',
                        permissions    : 'ADMIN DEVELOPER',
                        access    : false,
                        title: 'App Setting',
                        translate: 'NAV.APP_SETTING.TITLE',
                        type : 'item',
                        url  : '/settings'
                    },
                    {
                        id   : 'roles',
                        title: 'Roles',
                        permissions    : 'ADMIN DEVELOPER',
                        access    : false,
                        translate: 'NAV.ROLES.TITLE',
                        type : 'item',
                        url  : '/roles'
                    }

                ]
            },
            {
                id       : 'developeroption',
                title    : 'Developer Option',
                permissions    : 'ADMIN DEVELOPER',
                access    : false,
                translate: 'NAV.DEVELOPER_OPTION.TITLE',
                type     : 'collapsable',
                icon     : 'border_all',
                children : [
                    {
                        id   : 'permissions',
                        title: 'Permission',
                        permissions   : 'ADMIN DEVELOPER',
                        access    : false,
                        translate: 'NAV.PERMISSIONS.TITLE',
                        type : 'item',
                        url  : '/permissions'
                    }

                ]
            }
            
        ]
    }
];
