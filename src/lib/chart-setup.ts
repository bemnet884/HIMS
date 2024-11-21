// src/lib/chart-setup.ts
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement } from 'chart.js';

// Register the required components
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement);
