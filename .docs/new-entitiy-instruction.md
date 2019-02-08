
1- Create Entitiy Module.
   $ ng g m main/skills
2- Create Enitity Model   
   $ ng g class main/skills/skill --type=model
3- Create Enitity Service 
   $ ng g s main/skills/skill
4- Create Enitity View Add/Edit Component 
   $ ng g c main/skills/skill
5- Create Enitity View list Component 
   $ ng g c main/skills/skill-list    
6- Create Module Routings 


    const routes: Routes = [
    {
        path     : 'skills',
        component: SkillListComponent,
        resolve  : {
            data: SkillService
        }
    },
    {
        path     : 'skills/:id',
        component: SkillComponent,
        resolve  : {
            data: SkillService
        }
        
    },
    {
        path     : 'skills/:id/:handle',
        component: SkillComponent,
        resolve  : {
            data: SkillService
        }
        
    }
    ];   






ng g m main/fringebenefits
ng g class main/fringebenefits/fringebenefit --type=model
ng g s main/fringebenefits/fringebenefit
ng g c main/fringebenefits/fringebenefit
ng g c main/fringebenefits/fringebenefit-list    