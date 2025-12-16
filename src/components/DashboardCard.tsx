import { Card, CardContent, type CardProps, styled } from '@mui/material';
import type { ReactNode } from 'react';

interface DashboardCardProps extends CardProps {
  children: ReactNode;
  contentPadding?: number;
  noPadding?: boolean;
}

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.custom.cardBackgroundGradient,
  backdropFilter: 'blur(16px)',
  border: `1px solid ${theme.palette.custom.border}`, // Using the updated border color
  borderRadius: theme.shape.borderRadius,
  overflow: 'visible', // Allow glows to bleed out if we add them later
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

  '&:hover': {
    background: theme.palette.custom.cardBackgroundGradientHover,
    border: `1px solid ${theme.palette.custom.borderHover}`,
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.custom.shadowPrimaryHover,
  },

  // subtle inner highlight
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background: `linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.01))`,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
  },
}));

export default function DashboardCard({ children, contentPadding = 3, noPadding = false, sx, ...props }: DashboardCardProps) {
  return (
    <StyledCard elevation={0} sx={sx} {...props}>
      {noPadding ? children : <CardContent sx={{ p: contentPadding, '&:last-child': { pb: contentPadding } }}>{children}</CardContent>}
    </StyledCard>
  );
}
