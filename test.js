const fetchFn = async () => ({
    success: true,
    message: 'Operation completed successfully.',
    data: { items: [], totalCount: 0 }
});

async function simulateUseCrudTable() {
    try {
        const res = await fetchFn();
        if (res.items.length === 0) {
            console.log('Empty');
        }
    } catch (error) {
        console.error('Stack Trace:', error.stack);
    }
}
simulateUseCrudTable();
