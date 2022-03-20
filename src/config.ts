export default class Config {

    private constructor() {}

    // Literally everything will be static
    static backendPort = 30144;
    
    static hookKey = "test"


    static lengths = {
        user_id: 32,
        recovery_key: 24,
        container_id: 32
    }

    static limits = {
        user_limit: null, // not implemented yet
        user_container_limit: 6,
        container_entry_limit: 32,
        entry_password_length_limit: 1024
    }
}