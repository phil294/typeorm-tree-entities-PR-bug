import { createConnection, getManager } from 'typeorm';
import 'reflect-metadata';
import { Photo } from './models/Photo';

(async () => {
    await createConnection();

    const repo = getManager().getTreeRepository(Photo);

    const grandparent = new Photo({ id: 1, title: 'grandparent' });
    await grandparent.save();
    
    const parent = new Photo({ id: 2, title: 'parent' });
    parent.parent = grandparent;
    await parent.save();
    
    const child = new Photo({ id: 3, title: 'child' });
    child.parent = parent;
    await child.save();

    let descendants = await repo.findDescendants(grandparent);
    console.log(descendants)
    if(descendants.length !== 3) // works
        throw 'aaaaa'

    parent.parent = null;
    await parent.save();
    // now two grandparent entries are correctly removed from the closure table

    // restore to previous state
    parent.parent = grandparent;
    await parent.save();
    descendants = await repo.findDescendants(grandparent);
    console.log(descendants)
    // DOES NOT WORK
    // Closure table at this point only associates grandparent with parent, but
    // grandparent->child relation is lost!
    if(descendants.length !== 3)
        throw 'bbbbb'
})()