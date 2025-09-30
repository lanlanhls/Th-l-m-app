export interface CommuneRisk {
  name: string;
  riskLevel: number; // 1: Thấp, 2: Trung bình, 3: Cao, 4: Rất cao
}

export interface RiskData {
  overallRiskLevel: string; // Thấp, Trung bình, Cao, Rất cao
  summary: string;
  communeRisks: CommuneRisk[];
}