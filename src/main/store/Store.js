import BaseStore from 'electron-store';
import yaml from 'js-yaml';

class Store extends BaseStore{
    constructor(){
        super({
            fileExtension:'yaml',
            serialize:yaml.dump,
            deserialize:yaml.load,
            schema:{
                toolbar:{
                    type:'boolean',
                    default:true
                },
                statusbar:{
                    type:'boolean',
                    default:true
                },
                fullscreen:{
                    type:'boolean',
                    default:false
                },
                doublepage:{
                    type:'boolean',
                    default:false
                },
                mangamode:{
                    type:'boolean',
                    default:false
                },
                fitmode:{
                    type:'string',
                    default:'best'
                },
                rotation:{
                    type:'number',
                    minimum:0,
                    maximum:270,
                    default:0
                },

                commands:{
                    type:'object',
                    properties:{
                        rar:{
                            type:'string',
                            default:'rar'
                        },
                        sort:{
                            type:'string',
                            default:'sort'
                        }
                    }
                },

                collections:{
                    type:'array',
                    items:{
                        type:'string'
                    }
                },
                recentFiles:{
                    type:'array',
                    items:{
                        type:'object',
                        properties:{
                            filepath:{
                                type:'string'
                            },
                            page:{
                                type:'number',
                                minimum:0,
                                default:0
                            }
                        }
                    }
                }
            }
        });
    }
}

export default Store;

