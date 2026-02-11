import { Card, CardContent, type CardProps, styled } from '@mui/material';
import type { ReactNode } from 'react';
import type { ResponsiveStyleValue } from '@mui/system';

interface DashboardCardProps extends CardProps {
  children: ReactNode;
  contentPadding?: ResponsiveStyleValue<number | string>;
  noPadding?: boolean;
}

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.custom.cardBackgroundGradient,
  backdropFilter: 'blur(16px)',
  border: `1px solid ${theme.palette.custom.border}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'visible',
  position: 'relative',

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
