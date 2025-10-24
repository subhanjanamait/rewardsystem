import React, { useState } from "react";
import { Sparkles, IndianRupee, PlusCircle, Save } from "lucide-react";

export default function Rules() {
  const [earningRate, setEarningRate] = useState(10);
  const [pointsPer, setPointsPer] = useState(1);

  const handleSave = () => {
    alert(`Saved: ${pointsPer} point for every ${earningRate} rupees`);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f7fa'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 6px 32px rgba(0,0,0,.07)',
        padding: '38px 32px 28px 32px',
        minWidth: 350,
        maxWidth: 440
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', gap: 8 }}>
          <Sparkles color="#238EFE" size={26} />
          <h2 style={{
            color: '#242d3c',
            fontWeight: 700,
            letterSpacing: '.2px',
            margin: 0
          }}>Rewards Rules</h2>
        </div>
        <div style={{
          color: '#65738a',
          marginBottom: '18px',
          fontSize: '15px'
        }}>
          Points, referrals, coupons
        </div>
        <hr style={{border: 'none', borderTop: '1px solid #e6e9ef', marginBottom: '22px'}}/>
        <label style={{fontWeight: 600, color: '#242d3c', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: 6}}>
          <PlusCircle color="#65738a" size={20} />
          Earning Rate
        </label>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: 13, color: '#65738a', marginBottom: 2}}>Points</div>
            <input
              type="number"
              min="1"
              value={pointsPer}
              onChange={e => setPointsPer(Number(e.target.value))}
              style={{
                padding: '8px 6px', width: '60px',
                borderRadius: '7px', border: '1px solid #e6e9ef',
                textAlign: 'center', fontSize: 15
              }}
            />
          </div>
          <span style={{color: '#242d3c', fontWeight: 500}}>per</span>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: 13, color: '#65738a', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 3}}>
              <IndianRupee size={15} color="#65738a" />
              Rupees
            </div>
            <input
              type="number"
              min="1"
              value={earningRate}
              onChange={e => setEarningRate(Number(e.target.value))}
              style={{
                padding: '8px 6px', width: '90px',
                borderRadius: '7px', border: '1px solid #e6e9ef',
                textAlign: 'center', fontSize: 15
              }}
            />
          </div>
        </div>
        <button
          className="btn primary"
          onClick={handleSave}
          style={{
            width: "100%",
            background: "#238EFE",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "16px",
            padding: "12px 0",
            marginTop: "16px",
            transition: 'background 0.2s',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }}
        >
          <Save size={18} /> Save Rules
        </button>
      </div>
    </div>
  );
}
