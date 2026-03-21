import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const C = {
  bg: "#0A0C10",
  bgCard: "#0F1117",
  border: "#1E222C",
  borderLight: "#2A2F3C",
  gold: "#C9A646",
  goldLight: "#E2C36A",
  gray1: "#E8EDF2",
  gray2: "#9AA2B0",
  gray3: "#5A6270",
  green: "#2ECC71",
};

export default function Dashboard({ user, onNavigate }) {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAnalyses();
    }
  }, [user]);

  const loadAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAnalyses(data || []);
    } catch (error) {
      console.error('Error loading analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: '100vh', padding: '100px 48px 80px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <div>
            <button 
              onClick={() => onNavigate("home")}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: C.gray2, 
                cursor: 'pointer',
                marginBottom: 16,
                fontSize: 14
              }}
            >
              ← Back to Home
            </button>
            <h1 style={{ fontSize: 40, marginTop: 8 }}>Your Analyses</h1>
          </div>
          <button 
            className="btn-primary" 
            onClick={() => onNavigate("assessment")}
          >
            + New Analysis
          </button>
        </div>

        {loading ? (
          <p style={{ color: C.gray2 }}>Loading...</p>
        ) : analyses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 80, background: C.bgCard, borderRadius: 24 }}>
            <p style={{ color: C.gray2, marginBottom: 24 }}>No analyses yet. Start your first strategic assessment.</p>
            <button 
              className="btn-primary" 
              onClick={() => onNavigate("assessment")}
            >
              Create Your First Analysis →
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 20 }}>
            {analyses.map((analysis) => (
              <div key={analysis.id} style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: 24,
                transition: 'all 0.3s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 20, marginBottom: 8 }}>{analysis.name}</h3>
                    <p style={{ color: C.gray2, fontSize: 13 }}>
                      {analysis.origin} → {analysis.destination}
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    background: `${C.green}10`,
                    color: C.green,
                    borderRadius: 100,
                    fontSize: 12,
                  }}>
                    Completed
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: 11, color: C.gray3 }}>Strategy</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.strategy}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: C.gray3 }}>Cost</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.cost}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: C.gray3 }}>Risk</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: analysis.risk === 'Low' ? C.green : C.gold }}>{analysis.risk}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: C.gray3 }}>Confidence</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.confidence}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                  <button className="btn-secondary" style={{ padding: '8px 20px', fontSize: 13 }}>
                    View Details
                  </button>
                  <button className="btn-primary" style={{ padding: '8px 20px', fontSize: 13, background: C.gold, color: '#000' }}>
                    Export PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
