import NFCSimulation from '../js/nfc-simulation';

describe('NFCSimulation', () => {
    let nfcSim;
    let mockCanvas;
    let mockContext;

    beforeEach(() => {
        mockContext = {
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            clearRect: jest.fn()
        };
        
        mockCanvas = {
            getContext: jest.fn(() => mockContext),
            width: 1000,
            height: 800
        };
        
        document.getElementById = jest.fn(() => mockCanvas);
        nfcSim = new NFCSimulation();
    });

    test('initializes with correct parameters', () => {
        expect(nfcSim.fieldRadius).toBe(150);
        expect(nfcSim.particleCount).toBe(50);
        expect(nfcSim.particles.length).toBe(50);
    });

    test('activates field on mouse movement', () => {
        nfcSim.activateField();
        expect(nfcSim.isActive).toBe(true);
    });
}); 