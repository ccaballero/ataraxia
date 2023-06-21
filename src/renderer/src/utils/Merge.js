class Merge{
    /**
    * Simple object check.
    * @param item
    * @returns {boolean}
    */
    static isObject(item){
        return (
            item&&
            typeof item==='object'&&
            !Array.isArray(item)
        );
    }

    /**
    * Deep merge two objects.
    * @param target
    * @param ...sources
    */
    static mergeDeep(target,...sources){
        if(!sources.length){
            return target;
        }

        const source=sources.shift();

        if(
            Merge.isObject(target)&&
            Merge.isObject(source)
        ){
            for(const key in source){
                if(Merge.isObject(source[key])){
                    if(!target[key]){
                        Object.assign(target,{
                            [key]:{}
                        });
                    }

                    Merge.mergeDeep(target[key],source[key]);
                }else{
                    Object.assign(target,{
                        [key]:source[key]
                    });
                }
            }
        }

        return Merge.mergeDeep(target,...sources);
    }
}

export default Merge;

