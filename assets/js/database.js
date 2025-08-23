// Simulated Database for IT Connect Demo
// This file contains demo user accounts and database simulation functions

class ITConnectDatabase {
    constructor() {
        this.users = [
            {
                id: 1,
                email: 'demo@itconnect.com',
                password: 'demo123',
                firstName: 'Demo',
                lastName: 'User',
                phone: '+91 9884745432',
                role: 'customer',
                registrationDate: '2024-01-15',
                lastLogin: null,
                isActive: true,
                profile: {
                    address: 'Chennai, Tamil Nadu',
                    preferences: {
                        notifications: true,
                        newsletter: true
                    }
                },
                serviceHistory: [
                    {
                        id: 'SRV001',
                        date: '2024-02-20',
                        service: 'Laptop Screen Replacement',
                        status: 'Completed',
                        cost: 8500
                    },
                    {
                        id: 'SRV002',
                        date: '2024-03-15',
                        service: 'Battery Replacement',
                        status: 'Completed',
                        cost: 3200
                    }
                ],
                orders: [
                    {
                        id: 'ORD001',
                        date: '2024-03-20',
                        items: ['Laptop Charger', 'Mouse Pad'],
                        total: 2500,
                        status: 'Delivered'
                    }
                ]
            },
            {
                id: 2,
                email: 'john.doe@example.com',
                password: 'john123',
                firstName: 'John',
                lastName: 'Doe',
                phone: '+91 9876543210',
                role: 'customer',
                registrationDate: '2024-02-10',
                lastLogin: null,
                isActive: true,
                profile: {
                    address: 'Bangalore, Karnataka',
                    preferences: {
                        notifications: true,
                        newsletter: false
                    }
                },
                serviceHistory: [
                    {
                        id: 'SRV003',
                        date: '2024-03-01',
                        service: 'Virus Removal & System Cleanup',
                        status: 'Completed',
                        cost: 1500
                    }
                ],
                orders: []
            },
            {
                id: 3,
                email: 'sarah.wilson@example.com',
                password: 'sarah456',
                firstName: 'Sarah',
                lastName: 'Wilson',
                phone: '+91 9123456789',
                role: 'customer',
                registrationDate: '2024-01-25',
                lastLogin: null,
                isActive: true,
                profile: {
                    address: 'Mumbai, Maharashtra',
                    preferences: {
                        notifications: false,
                        newsletter: true
                    }
                },
                serviceHistory: [
                    {
                        id: 'SRV004',
                        date: '2024-02-28',
                        service: 'Keyboard Replacement',
                        status: 'In Progress',
                        cost: 2800
                    },
                    {
                        id: 'SRV005',
                        date: '2024-01-30',
                        service: 'RAM Upgrade',
                        status: 'Completed',
                        cost: 4500
                    }
                ],
                orders: [
                    {
                        id: 'ORD002',
                        date: '2024-03-18',
                        items: ['Wireless Mouse', 'USB Hub'],
                        total: 1800,
                        status: 'Shipped'
                    }
                ]
            },
            {
                id: 4,
                email: 'admin@itconnect.com',
                password: 'admin123',
                firstName: 'Admin',
                lastName: 'User',
                phone: '+91 9884745432',
                role: 'admin',
                registrationDate: '2024-01-01',
                lastLogin: null,
                isActive: true,
                profile: {
                    address: 'Chennai, Tamil Nadu',
                    preferences: {
                        notifications: true,
                        newsletter: true
                    }
                },
                serviceHistory: [],
                orders: []
            },
            {
                id: 5,
                email: 'tech@itconnect.com',
                password: 'tech123',
                firstName: 'Tech',
                lastName: 'Support',
                phone: '+91 9884745433',
                role: 'technician',
                registrationDate: '2024-01-05',
                lastLogin: null,
                isActive: true,
                profile: {
                    address: 'Chennai, Tamil Nadu',
                    preferences: {
                        notifications: true,
                        newsletter: false
                    }
                },
                serviceHistory: [],
                orders: []
            }
        ];
        
        this.sessions = [];
    }

    // Authenticate user
    authenticateUser(email, password) {
        const user = this.users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password && 
            u.isActive
        );
        
        if (user) {
            // Update last login
            user.lastLogin = new Date().toISOString();
            
            // Create session
            const session = {
                sessionId: this.generateSessionId(),
                userId: user.id,
                email: user.email,
                role: user.role,
                loginTime: new Date().toISOString(),
                isActive: true
            };
            
            this.sessions.push(session);
            
            return {
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    phone: user.phone,
                    profile: user.profile
                },
                session: session
            };
        }
        
        return {
            success: false,
            message: 'Invalid email or password'
        };
    }

    // Register new user
    registerUser(userData) {
        // Check if email already exists
        const existingUser = this.users.find(u => 
            u.email.toLowerCase() === userData.email.toLowerCase()
        );
        
        if (existingUser) {
            return {
                success: false,
                message: 'Email address is already registered'
            };
        }
        
        // Create new user
        const newUser = {
            id: this.users.length + 1,
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            role: 'customer',
            registrationDate: new Date().toISOString().split('T')[0],
            lastLogin: null,
            isActive: true,
            profile: {
                address: '',
                preferences: {
                    notifications: true,
                    newsletter: true
                }
            },
            serviceHistory: [],
            orders: []
        };
        
        this.users.push(newUser);
        
        return {
            success: true,
            message: 'Account created successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role
            }
        };
    }

    // Get user by ID
    getUserById(userId) {
        return this.users.find(u => u.id === userId);
    }

    // Get user by email
    getUserByEmail(email) {
        return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    // Validate session
    validateSession(sessionId) {
        const session = this.sessions.find(s => s.sessionId === sessionId && s.isActive);
        if (session) {
            const user = this.getUserById(session.userId);
            return { valid: true, user, session };
        }
        return { valid: false };
    }

    // Logout user
    logoutUser(sessionId) {
        const sessionIndex = this.sessions.findIndex(s => s.sessionId === sessionId);
        if (sessionIndex !== -1) {
            this.sessions[sessionIndex].isActive = false;
            return { success: true };
        }
        return { success: false };
    }

    // Generate session ID
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get all demo credentials (for display purposes)
    getDemoCredentials() {
        return this.users
            .filter(user => user.role === 'customer' || user.email.includes('demo'))
            .map(user => ({
                email: user.email,
                password: user.password,
                name: `${user.firstName} ${user.lastName}`,
                role: user.role
            }));
    }

    // Reset password (demo functionality)
    resetPassword(email) {
        const user = this.getUserByEmail(email);
        if (user) {
            // In a real system, this would send an email
            return {
                success: true,
                message: 'Password reset instructions sent to your email'
            };
        }
        return {
            success: false,
            message: 'Email address not found'
        };
    }

    // Update user profile
    updateUserProfile(userId, profileData) {
        const user = this.getUserById(userId);
        if (user) {
            user.profile = { ...user.profile, ...profileData };
            return { success: true, user };
        }
        return { success: false, message: 'User not found' };
    }

    // Add service record
    addServiceRecord(userId, serviceData) {
        const user = this.getUserById(userId);
        if (user) {
            const serviceRecord = {
                id: 'SRV' + String(Date.now()).slice(-3),
                date: new Date().toISOString().split('T')[0],
                ...serviceData
            };
            user.serviceHistory.push(serviceRecord);
            return { success: true, serviceRecord };
        }
        return { success: false, message: 'User not found' };
    }

    // Add order record
    addOrderRecord(userId, orderData) {
        const user = this.getUserById(userId);
        if (user) {
            const orderRecord = {
                id: 'ORD' + String(Date.now()).slice(-3),
                date: new Date().toISOString().split('T')[0],
                ...orderData
            };
            user.orders.push(orderRecord);
            return { success: true, orderRecord };
        }
        return { success: false, message: 'User not found' };
    }
}

// Create global database instance
window.ITConnectDB = new ITConnectDatabase();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ITConnectDatabase;
}